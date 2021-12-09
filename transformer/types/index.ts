export type AttributeParameter = boolean | number | string;

export type ActionHttpMethod = 'post' | 'put' | 'get' | 'delete';

export type PropertyAttribute = {
	name: string;
	parameters: Array<AttributeParameter>;
};

export type ThunkGenerator = {
	parent: string;
	action: ControllerAction;
};

export type ThunkGeneratorGroup = {
	name: string;
	generators: Array<ThunkGenerator>;
};

export type SliceGenerator = {
	name: string;
	thunks: Array<string>;
};

export type ControllerActionResponse = {
	type?: string;
	isArray: boolean;
	isPaginated: boolean;
	isPrimitive: boolean;
	arrayLevels?: number;
};

export type ControllerActionParam = {
	name: string;
	type: string;
	isPrimitive: boolean;
	isNullable: boolean;
	isArray: boolean;
	arrayLevels?: number;
	defaultValue?: unknown;
	isFromQuery?: boolean;
	isFromRoute?: boolean;
};

export type ControllerActionRouteChunk = {
	name: string;
	isVariable: boolean;
};

export type ControllerAction = {
	name: string;
	attributes: Array<PropertyAttribute>;
	httpMethod: ActionHttpMethod;
	route: string;
	routeChunks: Array<ControllerActionRouteChunk>;
	params: Array<ControllerActionParam>;
	response: ControllerActionResponse;
};

export type ClassProperty = {
	name: string;
	type: string;
	normalizedType: string;
	isNullable: boolean;
	isEnum: boolean;
	isPrimitive: boolean;
	isArray: boolean;
	arrayLevels?: number;
	attributes: Array<PropertyAttribute>;
};

export type GeneratedEntity = {
	name: string;
	data: string;
	entitiesImports: Array<string>;
	typingsImports: Array<string>;
};

export type GeneratedEnum = {
	data: string;
};

export type GeneratedOption = {
	name: string;
	data: string;
	entitiesImports: Array<string>;
	typingsImports: Array<string>;
};

export type GeneratedValidationSchema = {
	name: string;
	data: string;
};

export type GeneratedNormalizationSchema = {
	name: string;
	data: string;
	entitiesImports: Array<string>;
};

export type GeneratedAdapter = {
	name: string;
	data: string;
};

export type GeneratedController = {
	name: string;
	actions: Array<ControllerAction>;
};

export type GeneratedThunkResponse = {
	type: string;
	entities: Array<string>;
};

export type GeneratedThunk = {
	name: string;
	data: string;
	response?: GeneratedThunkResponse;
};

export type GeneratedThunkCollection = {
	name: string;
	data: string;
	thunks: Array<GeneratedThunk>;
};

export type GeneratedSlice = {
	name: string;
	data: string;
};
