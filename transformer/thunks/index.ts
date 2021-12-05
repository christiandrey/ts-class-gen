import {
	GeneratedController,
	GeneratedThunk,
	GeneratedThunkCollection,
	ThunkFactory,
} from '../types';
import {
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	isDefined,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../utils';
import {
	enterEmitterScope,
	getTsClassName,
	getTsThunkName,
	getType,
	isOptionsDto,
	leaveEmitterScope,
	wrapString,
	wrapType,
} from '../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {paths} from '../paths';

const ENTITY_THUNK_KEY_MAP: Record<string, string> = {
	LabScan: 'Lab',
	LabTest: 'Lab',
	LabTestResult: 'Lab',
};

const PAGINATED_QUERY_PARAMS = ['page', 'pageSize', 'query'];

function generateThunk(
	collectionName: string,
	factory: ThunkFactory,
	typescriptEmitter: TypeScriptEmitter,
	normalizationSchemas: Array<string>,
): GeneratedThunk {
	const {action, controller} = factory;
	const {name, httpMethod, params, response} = action;
	const responseType = response.type;
	const normalizedResponseType = responseType ? getTsClassName(responseType, true) : undefined;
	const thunkName = getTsThunkName({
		actionName: name,
		actionController: controller,
		actionHttpMethod: httpMethod,
		thunkCollectionName: collectionName,
	});

	const stringifiedParams = params.map((o) => o.name).join(', ');
	const nonPaginatedParams = params.filter((o) => !PAGINATED_QUERY_PARAMS.includes(o.name));
	let paramsTypeChunk = `{${nonPaginatedParams.map(getType).join('; ')}}`;
	paramsTypeChunk = wrapType(paramsTypeChunk, 'PaginatedQueryParams', response.isPaginated);
	const paramsChunk = paramsTypeChunk.length ? `params: ${paramsTypeChunk}` : '';

	enterEmitterScope(
		typescriptEmitter,
		`export const ${toCamelCase(thunkName)} = createTypedAsyncThunk(`,
	);
	typescriptEmitter.writeLine(
		`'${toCamelCase(getPlural(collectionName))}/${toCamelCase(thunkName)}',`,
	);
	enterEmitterScope(typescriptEmitter, `async (${paramsChunk}) => {`);

	if (paramsChunk.length) {
		typescriptEmitter.writeLine(`const {${stringifiedParams}} = params;`);
	}

	typescriptEmitter.writeLine(
		`const response = await api.${toCamelCase(getPlural(controller))}().${toCamelCase(
			action.name,
		)}(${stringifiedParams});`,
	);

	if (!responseType || !normalizedResponseType) {
		typescriptEmitter.writeLine(`return response;`);
	} else {
		if (response.isPaginated) {
			typescriptEmitter.writeLine('const meta = response.data.meta;');
		}

		const responseDataIsArray = response.isArray || response.isPaginated;
		const responseDataType = toCamelCase(normalizedResponseType);
		const responseData = responseDataIsArray ? getPlural(responseDataType) : responseDataType;
		const responseCanNormalize = normalizationSchemas.some((o) => o === normalizedResponseType);

		if (response.isArray || response.isPaginated) {
			typescriptEmitter.writeLine(
				`const ${responseData} = response.data.data.map((o) => new ${responseType}(o));`,
			);
		} else {
			typescriptEmitter.writeLine(
				`const ${responseData} = new ${responseType}(response.data.data);`,
			);
		}

		if (responseCanNormalize) {
			typescriptEmitter.writeLine(
				`const normalized = safeNormalize<${normalizedResponseType}, ${getTsClassName(
					responseType,
					true,
				)}Entities, ${wrapType(
					'string',
					'Array',
					responseDataIsArray,
				)}>(${responseData}, ${wrapString(
					`${responseDataType}Schema`,
					'[',
					']',
					responseDataIsArray,
				)});`,
			);
			typescriptEmitter.writeLine(
				`return ${response.isPaginated ? '{...normalized, meta}' : 'normalized'};`,
			);
		} else {
			typescriptEmitter.writeLine(`return ${responseData}`);
		}
	}

	leaveEmitterScope(typescriptEmitter, '},');
	leaveEmitterScope(typescriptEmitter, ');');

	return {
		name: thunkName,
		data: typescriptEmitter.output,
	};
}

function generateThunkCollection(
	name: string,
	factories: Array<ThunkFactory>,
	enums: Array<string>,
	normalizationSchemas: Array<string>,
): GeneratedThunkCollection {
	const thunks: Array<GeneratedThunk> = [];
	const typescriptEmitter = new TypeScriptEmitter();

	const entitiesImports = arrayUnique(
		factories
			.map((factory) => {
				const {
					action: {
						response: {isPrimitive, type},
					},
				} = factory;
				return isPrimitive ? undefined : type;
			})
			.filter(isDefined),
	);
	const paramsImports = factories.flatMap((o) =>
		o.action.params.filter((p) => !p.isPrimitive).map((o) => o.type),
	);

	const typingsImports = arrayUnique(
		paramsImports
			.filter((o) => enums.includes(o))
			.concat(
				[
					factories.some((o) => o.action.response.isPaginated) ? 'PaginatedQueryParams' : undefined,
				].filter(isDefined),
			),
	);
	const optionsImports = arrayUnique(
		entitiesImports.filter(isOptionsDto).concat(paramsImports.filter(isOptionsDto)),
	);
	const schemasImports = entitiesImports.filter((entity) =>
		normalizationSchemas.some((o) => o === getTsClassName(entity, true)),
	);

	schemasImports.forEach((o) => {
		typescriptEmitter.writeLine(
			`import {${o}Entities, ${toCamelCase(
				o,
			)}Schema} from '../../../schemas/normalization/${toKebabCase(o)}';`,
		);
	});

	if (typingsImports.length) {
		typescriptEmitter.writeLine(`import {${typingsImports.join(', ')}} from '../../../typings';`);
	}

	if (optionsImports.length) {
		typescriptEmitter.writeLine(
			`import {${optionsImports.join(', ')}} from '../../../typings/dtos';`,
		);
	}

	typescriptEmitter.writeLine(
		`import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';`,
	);
	typescriptEmitter.ensureNewParagraph();

	entitiesImports.forEach((o) => {
		typescriptEmitter.writeLine(`import {${o}} from '../../../entities/${toKebabCase(o)}';`);
	});

	typescriptEmitter.writeLine(`import {api} from '../../../api';`);
	typescriptEmitter.ensureNewParagraph();

	for (const factory of factories) {
		const thunk = generateThunk(name, factory, typescriptEmitter, normalizationSchemas);
		thunks.push(thunk);
		typescriptEmitter.ensureNewParagraph();
	}

	return {
		name,
		data: typescriptEmitter.output,
		thunks,
	};
}

export async function transformToThunksAsync(
	controllers: Array<GeneratedController>,
	enums: Array<string>,
	normalizationSchemas: Array<string>,
) {
	const dir = paths.THUNKS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	controllers = controllers.filter(({name}) => normalizationSchemas.some((o) => o.includes(name)));

	const thunkFactories: Record<string, Array<ThunkFactory>> = {};
	const pushThunkFactory = (key: string, thunkFactory: ThunkFactory) => {
		const thunkKeys = Object.keys(thunkFactories);
		const thunkKey = ENTITY_THUNK_KEY_MAP[key] ?? thunkKeys.find((o) => o === key) ?? key;
		thunkFactories[thunkKey] = [...(thunkFactories[thunkKey] ?? []), thunkFactory];
	};

	for (const controller of controllers) {
		const {name: controllerName, actions: controllerActions} = controller;

		for (const action of controllerActions) {
			const responseType = action.response.type;
			const thunkFactory: ThunkFactory = {
				action,
				controller: controllerName,
			};

			if (
				!responseType ||
				[controllerName, `${controllerName}Lite`].includes(responseType) ||
				ENTITY_THUNK_KEY_MAP[responseType] === controllerName
			) {
				pushThunkFactory(controllerName, thunkFactory);
			} else {
				pushThunkFactory(getTsClassName(responseType, true), thunkFactory);
			}
		}
	}

	const thunkCollections = Object.entries(thunkFactories).map(([controller, factories]) =>
		generateThunkCollection(controller, factories, enums, normalizationSchemas),
	);
	const exports = thunkCollections.map(({name}) => `export * from './${toKebabCase(name)}';`);

	for (const {name, data} of thunkCollections) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	await createFileAsync('index.ts', dir, exports.join('\n'));

	return thunkCollections;
}
