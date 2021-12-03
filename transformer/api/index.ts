import {
	ActionHttpMethod,
	ControllerAction,
	ControllerActionParam,
	ControllerActionResponse,
	ControllerActionRouteChunk,
	GeneratedController,
} from '../types';
import {CSharpMethod, CSharpType, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {
	createDirAsync,
	createFileAsync,
	getPlural,
	isDefined,
	removeDirAsync,
	replaceAll,
	toCamelCase,
	toKebabCase,
} from '../../utils';
import {
	getAttributeParameter,
	getChildType,
	getControllersAsync,
	getTsClassName,
	getTsControllerMethodName,
	getTsControllerName,
	isNotBaseController,
	isPrimitive,
	wrapType,
} from '../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {parser} from '../parser';
import {paths} from '../paths';

function generateActionRouteChunks(route: string): Array<ControllerActionRouteChunk> {
	if (!route.length) {
		return [];
	}

	return route.split('/').map((chunk) => ({
		name: chunk.replace(/[{}]/gm, '').split(':')[0],
		isVariable: chunk.includes('{'),
	}));
}

function generateActionResponse(
	typeEmitter: TypeEmitter,
	returnType: CSharpType,
): ControllerActionResponse {
	const transformedType = getTsClassName(
		getChildType(typeEmitter.convertTypeToTypeScript(returnType)),
	);
	const response: ControllerActionResponse = {
		type: transformedType === 'Response' ? undefined : transformedType,
		isArray: false,
		isPaginated: false,
		isPrimitive: false,
		arrayLevels: 0,
	};

	const fn = ({name, genericParameters}: CSharpType) => {
		if (name.startsWith('Paginated')) {
			response.isPaginated = true;
		}

		if (name.startsWith('Array')) {
			response.isArray = true;
			response.arrayLevels = (response.arrayLevels ?? 0) + 1;
		}

		if (name.endsWith('<>')) {
			genericParameters.forEach(fn);
		}
	};

	fn(returnType);
	return response;
}

function generateActionContent(action: ControllerAction): string {
	const {params, response, routeChunks, httpMethod} = action;
	const paramsChunk = `(${params
		.map(
			(o) =>
				`${o.name}${o.isNullable ? '?' : ''}: ${wrapType(
					o.type,
					'Array',
					o.isArray,
					o.arrayLevels,
				)}`,
		)
		.join(', ')})`;

	const responseTypeChunk = `<${wrapType(
		wrapType(response.type ?? 'ApiResponse', 'Array', response.isArray, response.arrayLevels),
		response.isPaginated ? 'PaginatedApiResponse' : 'ApiResponse',
		!!response.type,
	)}>`;

	const fnUrlChunk = `build(${['path']
		.concat(
			routeChunks.map(
				({name, isVariable}) => `${isVariable ? toCamelCase(name) : `'${name.toLowerCase()}'`}`,
			),
		)
		.join(', ')})`;

	const configParams = params.filter((o) => !o.isFromRoute && (o.isFromQuery || o.isPrimitive));
	const dataParam = params.find((o) => !o.isFromQuery && !o.isFromRoute);

	const fnDataChunk = ['get', 'delete'].includes(httpMethod)
		? ''
		: dataParam?.name ?? (configParams.length ? 'null' : '');

	const fnConfigChunk = configParams.length
		? `{params:{${configParams
				.map((o) =>
					!o.isPrimitive && o.isFromQuery ? `...${toCamelCase(o.name)}` : toCamelCase(o.name),
				)
				.join(', ')}}}`
		: '';

	const fnBodyChunk = [fnUrlChunk, fnDataChunk, fnConfigChunk].filter((o) => !!o.length).join(', ');

	return `${paramsChunk} => instance.${httpMethod}${responseTypeChunk}(${fnBodyChunk})`;
}

function getControllerActionMapper(
	typeEmitter: TypeEmitter,
): (method: CSharpMethod) => ControllerAction | undefined {
	return (method) => {
		const name = getTsControllerMethodName(method.name);
		const routeAttribute = method.attributes.find((o) => o.name.startsWith('Http'));

		if (!routeAttribute) {
			return undefined;
		}

		const httpMethod = routeAttribute.name.replace('Http', '').toLowerCase() as ActionHttpMethod;
		const route = routeAttribute.parameters[0]?.value.toString() ?? '';
		const routeChunks = generateActionRouteChunks(route);
		const response = generateActionResponse(typeEmitter, method.returnType);
		const attributes = method.attributes.map((o) => ({
			name: o.name,
			parameters: o.parameters.map(getAttributeParameter),
		}));
		const params: Array<ControllerActionParam> = method.parameters.map(
			({name, type, attributes}) => {
				const transformedType = typeEmitter.convertTypeToTypeScript(type);

				return {
					name,
					type: getTsClassName(getChildType(transformedType)),
					isPrimitive: isPrimitive(getChildType(transformedType)),
					isNullable: type.isNullable,
					isArray: transformedType.startsWith('Array'),
					arrayLevels: transformedType.match(/Array/g)?.length,
					isFromQuery: attributes.some((o) => o.name === 'FromQuery'),
					isFromRoute: routeChunks.some((o) => o.name === name),
				};
			},
		);

		return {
			name,
			attributes,
			httpMethod,
			params,
			response,
			route,
			routeChunks,
		};
	};
}

function generateController(source: string): GeneratedController {
	source = replaceAll(source, ' : base\\(mapper\\)', '');

	const typescriptEmitter = new TypeScriptEmitter();
	const typeEmitter = new TypeEmitter(typescriptEmitter);
	const file = parser.parseSource(source);
	const controller = file.getAllClassesRecursively()[0];
	const name = getTsControllerName(controller.name);
	const actions = controller.methods.map(getControllerActionMapper(typeEmitter)).filter(isDefined);

	return {
		name,
		actions,
	};
}

export async function transformToApiAsync() {
	const dir = paths.API_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const data = await getControllersAsync(isNotBaseController);
	const controllers = data.map(generateController);

	const typescriptEmitter = new TypeScriptEmitter();

	controllers.forEach(({name, actions}) => {
		typescriptEmitter.ensureNewParagraph();
		typescriptEmitter.enterScope(`const ${getPlural(toCamelCase(name))} = () => {`);
		typescriptEmitter.writeLine(`const path = '${toKebabCase(getPlural(name))}';`);
		typescriptEmitter.ensureNewParagraph();
		typescriptEmitter.enterScope(`return {`);

		actions.forEach((action) => {
			typescriptEmitter.writeLine(`${toCamelCase(action.name)}: ${generateActionContent(action)},`);
		});

		typescriptEmitter.leaveScope();
		typescriptEmitter.leaveScope();
	});

	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.enterScope('export const api = {');
	controllers.forEach(({name}) => typescriptEmitter.writeLine(`${getPlural(toCamelCase(name))},`));
	typescriptEmitter.leaveScope();

	await createFileAsync('index.ts', dir, typescriptEmitter.output);

	return controllers;
}
