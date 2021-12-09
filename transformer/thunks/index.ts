import {
	GeneratedController,
	GeneratedEntity,
	GeneratedNormalizationSchema,
	GeneratedOption,
	GeneratedThunk,
	GeneratedThunkCollection,
	GeneratedThunkResponse,
	ThunkGenerator,
	ThunkGeneratorGroup,
} from '../types';
import {
	arraySort,
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	isValidIndex,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../utils';
import {
	enterEmitterScope,
	generateTsThunkName,
	getTsClassName,
	getType,
	isPrimitive,
	leaveEmitterScope,
	wrapString,
	wrapType,
} from '../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {paths} from '../paths';

const ENTITY_THUNK_GENERATOR_GROUP_MAP: Record<string, string> = {
	LabScan: 'Lab',
	LabTest: 'Lab',
	LabTestResult: 'Lab',
};
const PAGINATED_QUERY_PARAMS = ['page', 'pageSize', 'query'];

function stringifyGeneratedThunkCollection(
	thunks: Array<GeneratedThunk>,
	imports: {
		entities: Array<string>;
		options: Array<string>;
		typings: Array<string>;
	},
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
): string {
	const {entities, options, typings} = imports;
	const typescriptEmitter = new TypeScriptEmitter();
	const entitiesImports = arrayUnique(entities);
	const optionsImports = arrayUnique(options);
	const typingsImports = arrayUnique(typings);
	const schemasImports = arrayUnique(
		entitiesImports
			.map((o) => getTsClassName(o, true))
			.filter((entity) => normalizationSchemas.some((o) => o.name === entity)),
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

	for (const thunk of thunks) {
		typescriptEmitter.write(thunk.data);
		typescriptEmitter.ensureNewParagraph();
	}

	return typescriptEmitter.output;
}

function getFlattenedEntities(
	entity: string,
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
): Array<string> {
	const flattenedEntities: Array<string> = [entity];
	const childEntities = normalizationSchemas.find((o) => o.name === entity)?.entitiesImports ?? [];

	for (const childEntity of childEntities) {
		flattenedEntities.push(...getFlattenedEntities(childEntity, normalizationSchemas));
	}

	return arrayUnique(flattenedEntities);
}

function getThunkMapper(
	group: ThunkGeneratorGroup,
	imports: {
		entities: Array<string>;
		options: Array<string>;
		typings: Array<string>;
	},
	config: {
		entities: Array<GeneratedEntity>;
		enums: Array<string>;
		normalizationSchemas: Array<GeneratedNormalizationSchema>;
		options: Array<GeneratedOption>;
	},
): (generator: ThunkGenerator) => GeneratedThunk {
	const {entities, enums, normalizationSchemas, options} = config;

	return (generator) => {
		const {action, parent} = generator;
		const {params, response} = action;
		const responseType = response.type;
		const normalizedResponseType = responseType ? getTsClassName(responseType, true) : undefined;
		const typescriptEmitter = new TypeScriptEmitter();
		const thunkName = generateTsThunkName({
			actionName: action.name,
			actionParentName: parent,
			actionHttpMethod: action.httpMethod,
			thunkGroupName: group.name,
		});
		const isPaginated =
			response.isPaginated || params.some((o) => PAGINATED_QUERY_PARAMS.includes(o.name));
		const nonPaginatedParams = params.filter((o) => !PAGINATED_QUERY_PARAMS.includes(o.name));
		const baseThunkParams: Array<string> = nonPaginatedParams.map((o) => getType(o));
		const thunkParams: Array<string> = isPaginated
			? [
					'params: ' +
						(baseThunkParams.length
							? wrapType(
									`{${nonPaginatedParams.map((o) => getType(o)).join('; ')}}`,
									'PaginatedQueryParams',
							  )
							: 'PaginatedQueryParams'),
			  ]
			: baseThunkParams;
		const entitiesImports = params.filter((o) => entities.some((p) => p.name === o.type));
		const optionsImports = params.filter((o) => options.some((p) => p.name === o.type));
		const typingsImports = params.filter((o) => enums.includes(o.type));
		const stringifiedParams =
			thunkParams.length > 1 ? `params: {${thunkParams.join('; ')}}` : thunkParams[0] ?? '';

		enterEmitterScope(
			typescriptEmitter,
			`export const ${toCamelCase(thunkName)} = createTypedAsyncThunk(`,
		);
		typescriptEmitter.writeLine(
			`'${toCamelCase(getPlural(group.name))}/${toCamelCase(thunkName)}',`,
		);
		enterEmitterScope(typescriptEmitter, `async (${stringifiedParams}) => {`);

		if (thunkParams.length > 1 || isPaginated) {
			typescriptEmitter.writeLine(`const {${params.map((o) => o.name).join(', ')}} = params;`);
		}

		typescriptEmitter.writeLine(
			`const response = await api.${toCamelCase(getPlural(parent))}().${toCamelCase(
				action.name,
			)}(${params.map((o) => o.name).join(', ')});`,
		);

		if (!normalizedResponseType || isPrimitive(normalizedResponseType)) {
			typescriptEmitter.writeLine(`return response;`);
		} else {
			if (response.isPaginated) {
				typescriptEmitter.writeLine('const meta = response.data.meta;');
			}

			const responseDataIsArray = response.isArray || response.isPaginated;
			const responseDataType = toCamelCase(normalizedResponseType);
			const responseCanNormalize = normalizationSchemas.some(
				(o) => o.name === normalizedResponseType,
			);

			typescriptEmitter.writeLine(
				responseDataIsArray
					? `const responseData = response.data.data.map((o) => new ${responseType}(o));`
					: `const responseData = new ${responseType}(response.data.data);`,
			);

			if (responseCanNormalize) {
				typescriptEmitter.writeLine(
					`const normalized = safeNormalize<${normalizedResponseType}, ${normalizedResponseType}Entities, ${wrapType(
						'string',
						'Array',
						responseDataIsArray,
					)}>(responseData, ${wrapString(
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
				typescriptEmitter.writeLine(`return responseData;`);
			}
		}

		leaveEmitterScope(typescriptEmitter, '},');
		leaveEmitterScope(typescriptEmitter, ');');

		imports.entities.push(
			...entitiesImports
				.map((o) => o.type)
				.concat(responseType && !isPrimitive(responseType) ? responseType : []),
		);

		imports.typings.push(
			...typingsImports.map((o) => o.type).concat(isPaginated ? 'PaginatedQueryParams' : []),
		);

		imports.options.push(...optionsImports.map((o) => o.type));

		return {
			name: thunkName,
			data: typescriptEmitter.output,
			response:
				!!responseType && !!normalizedResponseType && !isPrimitive(responseType)
					? ({
							type: responseType,
							entities: getFlattenedEntities(normalizedResponseType, normalizationSchemas),
							// entities:
							// 	normalizationSchemas.find((o) => o.name === normalizedResponseType)
							// 		?.entitiesImports ?? [],
					  } as GeneratedThunkResponse)
					: undefined,
		} as GeneratedThunk;
	};
}

function getThunkCollectionMapper(config: {
	entities: Array<GeneratedEntity>;
	enums: Array<string>;
	normalizationSchemas: Array<GeneratedNormalizationSchema>;
	options: Array<GeneratedOption>;
}): (group: ThunkGeneratorGroup) => GeneratedThunkCollection {
	return (group) => {
		const imports = {
			entities: new Array<string>(),
			options: new Array<string>(),
			typings: new Array<string>(),
		};
		const thunks = group.generators.map(getThunkMapper(group, imports, config));
		return {
			name: group.name,
			thunks,
			data: stringifyGeneratedThunkCollection(thunks, imports, config.normalizationSchemas),
		};
	};
}

function getThunkGeneratorGroups(
	controllers: Array<GeneratedController>,
): Array<ThunkGeneratorGroup> {
	const groups: Array<ThunkGeneratorGroup> = [];
	const pushToGroup = (group: string, generator: ThunkGenerator) => {
		const index = groups.findIndex((o) => o.name === group);
		isValidIndex(index)
			? groups[index].generators.push(generator)
			: groups.push({
					name: group,
					generators: [generator],
			  });
	};

	for (const controller of controllers) {
		const {name: parent, actions} = controller;
		const parentEntities = [parent, parent + 'Lite'];

		for (const action of actions) {
			const {
				response: {type: responseType},
			} = action;
			const thunkGenerator: ThunkGenerator = {parent, action};
			const useParentAsGroup =
				!responseType ||
				isPrimitive(responseType) ||
				parentEntities.includes(responseType) ||
				ENTITY_THUNK_GENERATOR_GROUP_MAP[responseType] === parent;

			pushToGroup(useParentAsGroup ? parent : getTsClassName(responseType, true), thunkGenerator);
		}
	}

	return arraySort(groups, false, (o) => o.name);
}

export async function transformToThunksAsync(config: {
	controllers: Array<GeneratedController>;
	entities: Array<GeneratedEntity>;
	enums: Array<string>;
	normalizationSchemas: Array<GeneratedNormalizationSchema>;
	options: Array<GeneratedOption>;
}) {
	const {controllers, normalizationSchemas} = config;
	const dir = paths.THUNKS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const thunkControllers = controllers.filter(({name}) =>
		normalizationSchemas.some((o) => o.name.includes(name)),
	);
	const thunkGeneratorGroups = getThunkGeneratorGroups(thunkControllers);
	const thunkCollections = thunkGeneratorGroups.map(getThunkCollectionMapper(config));
	const exports = thunkCollections.map(({name}) => `export * from './${toKebabCase(name)}';`);

	for (const {name, data} of thunkCollections) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	await createFileAsync('index.ts', dir, exports.join('\n'));

	return thunkCollections;
}
