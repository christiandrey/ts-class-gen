export type AttributeParameter = boolean | number | string;

export type PropertyAttribute = {
	name: string;
	parameters: Array<AttributeParameter>;
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
	enums: Array<string>;
};

export type GeneratedEnum = {
	data: string;
};

export type GeneratedOption = {
	data: string;
	enums: Array<string>;
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
};

export type GeneratedAdapter = {
	name: string;
	data: string;
};
