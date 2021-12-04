import {CSharpProperty, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {ClassProperty, PropertyAttribute} from '../types';
import {readDirAsync, readFileAsync, toCamelCase} from '../../utils';

import {CSharpAttributeParameter} from '@fluffy-spoon/csharp-parser';
import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {join} from 'path';
import {paths} from '../paths';

export function isEnum(type: string): boolean {
	const childType = getChildType(type);

	if (isPrimitive(childType)) {
		return false;
	}

	return !childType.endsWith('Dto');
}

export function isPrimitive(type: string, extraPrimitiveTypes: Array<string> = []): boolean {
	const primitives = ['boolean', 'number', 'string', ...extraPrimitiveTypes];
	return primitives.includes(type);
}

export function isClass({isPrimitive, isEnum}: ClassProperty): boolean {
	return !isPrimitive && !isEnum;
}

export function isOptionsDto(type: string): boolean {
	return type.includes('Options');
}

export function isClassDto(type: string): boolean {
	return !isOptionsDto(type);
}

export function isLiteDto(type: string): boolean {
	return type.includes('Lite');
}

export function isBaseDto(type: string): boolean {
	return type === 'BaseEntity';
}

export function isBaseController(name: string): boolean {
	return name.startsWith('BaseController');
}

export function isNotBaseController(name: string): boolean {
	return !isBaseController(name);
}

export function extendsLiteDto(parents: Array<string>): boolean {
	return parents.some((o) => o.includes('Lite'));
}

export function wrapType(child: string, parent?: string, wrap = true, repeat = 1): string {
	if (!parent?.length || !wrap) {
		return child;
	}

	const wrapped = `${parent}<${child}>`;

	repeat--;

	return repeat ? wrapType(wrapped, parent, wrap, repeat) : wrapped;
}

export function getChildType(type: string): string {
	return type.match(/<([A-za-z]+)>/)?.[1] ?? type;
}

export function getTsClassName(className: string, normalize = false): string {
	const type = className.replace('Dto', '');
	return normalize ? type.replace('Lite', '') : type;
}

export function getTsControllerName(controllerName: string) {
	return controllerName.replace('Controller', '');
}

export function getTsControllerMethodName(controllerName: string) {
	return controllerName.replace('Async', '').replace(/^Get/, 'Read');
}

export function getClassesSize(source: string): number {
	return source.match(/(public|private)\sclass/gim)?.length ?? 0;
}

export function getAttributeParameter(
	parameter: CSharpAttributeParameter,
): boolean | number | string {
	const {value} = parameter;

	if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
		return value;
	}

	return value.name;
}

export function getClassPropertyMapper(
	typeEmitter: TypeEmitter,
): (property: CSharpProperty) => ClassProperty {
	return ({name, type, attributes}) => {
		const transformedType = typeEmitter.convertTypeToTypeScript(type);
		return {
			name: toCamelCase(name),
			type: getTsClassName(getChildType(transformedType)),
			normalizedType: getTsClassName(getChildType(transformedType), true),
			arrayLevels: transformedType.match(/Array/g)?.length,
			isArray: transformedType.startsWith('Array'),
			isEnum: isEnum(transformedType),
			isPrimitive: isPrimitive(getChildType(transformedType)),
			isNullable: type.isNullable,
			attributes: attributes.map((o) => ({
				name: o.name,
				parameters: o.parameters.map(getAttributeParameter),
			})),
		};
	};
}

export function getPropertyAttributeYupFn({name, parameters}: PropertyAttribute) {
	const param = parameters[0];

	if (name === 'Required') {
		return 'required(getRequiredValidationMessage)';
	}

	if (name === 'MinLength') {
		return `min(${param ?? 1})`;
	}

	if (name === 'EmailAddress') {
		return 'email(getEmailValidationMessage)';
	}

	if (name === 'DataType') {
		if (param === 'DataType.Password') {
			return 'min(4)';
		}

		if (param === 'DataType.EmailAddress') {
			return 'email(getEmailValidationMessage)';
		}
	}
}

export function getPropertyTypeYupFn({type, isEnum, isPrimitive, isArray}: ClassProperty) {
	if (isEnum) {
		return `string()`;
	}

	if (isPrimitive) {
		return `${type}()`;
	}

	if (isArray) {
		return `array()`;
	}

	return `object()`;
}

export function getFullPropertyType(type: string, isArray: boolean, arrayLevels: number = 0) {
	if (!isArray) {
		return type;
	}

	const dummyArray = new Array(arrayLevels).fill(null);

	return dummyArray
		.map((_) => `Array<`)
		.concat(type)
		.concat(dummyArray.map((o) => `>`))
		.join('');
}

export function getEntityConstructorSuffix({
	name,
	type,
	isArray,
	isEnum,
	isNullable,
	isPrimitive,
}: ClassProperty): string {
	if (isPrimitive) {
		return `dto.${name}`;
	}

	if (isEnum) {
		return isArray ? `dto.${name} ?? []` : `dto.${name}`;
	}

	if (!isArray) {
		const creator = `new ${type}(dto.${name})`;
		return isNullable ? `dto.${name} ? ${creator}: undefined` : creator;
	}

	return `dto.${name}?.map((o) => new ${type}(o)) ?? []`;
}

export async function getDtosAsync(filter = (o: string) => !!o, exclude: Array<string> = []) {
	const dir = paths.DTOS_FOLDER;
	const exclusionList = exclude.map((p) => `${p}.cs`).concat('.DS_Store');
	const files = (await readDirAsync(dir)).filter(filter).filter((o) => !exclusionList.includes(o));
	const dtos: Array<string> = [];

	for (const file of files) {
		dtos.push(await readFileAsync(join(dir, file)));
	}

	return dtos;
}

export async function getControllersAsync(
	filter = (o: string) => !!o,
	exclude: Array<string> = [],
) {
	const dir = paths.CONTROLLERS_FOLDER;
	const exclusionList = exclude.map((p) => `${p}.cs`).concat('.DS_Store');
	const files = (await readDirAsync(dir)).filter(filter).filter((o) => !exclusionList.includes(o));
	const controllers: Array<string> = [];

	for (const file of files) {
		const content = await readFileAsync(join(dir, file));
		controllers.push(content);
	}

	return controllers;
}

export function hasValidationAttributes(content: string): boolean {
	return ['Required', 'DataType', 'MinLength', 'EmailAddress'].some((o) => content.includes(o));
}

export function enterEmitterScope(typescriptEmitter: TypeScriptEmitter, scopeText = '{') {
	typescriptEmitter.writeLine(scopeText);
	typescriptEmitter.increaseIndentation();
}

export function leaveEmitterScope(typescriptEmitter: TypeScriptEmitter, scopeText = '}') {
	typescriptEmitter.decreaseIndentation();
	typescriptEmitter.writeLine(scopeText);
}

//TODO: Add a utility function to get all entity class props, with option to include inherited entity classes.
