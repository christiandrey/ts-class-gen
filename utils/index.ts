import {PathLike, mkdir, readFile, readdir, rm, stat, writeFile} from 'fs';

import {join} from 'path';
import plur from 'plur';
import {promisify} from 'util';

const _readFileAsync = promisify(readFile);
const _rmAsync = promisify(rm);
const _mkdirAsync = promisify(mkdir);
const _readdirAsync = promisify(readdir);
const _writeFileAsync = promisify(writeFile);
const _statAsync = promisify(stat);

export type AttributeParameter = boolean | number | string;

/**
 * @deprecated
 */
export const VALIDATION_ATTRIBUTES = ['Required', 'DataType', 'MinLength', 'EmailAddress'];

/**
 * @deprecated
 */
export const VALIDATION_ATTRIBUTES_MAP: Map<
	string,
	(param?: AttributeParameter) => string | undefined
> = new Map([
	['Required', () => `required(getRequiredValidationMessage)`],
	[
		'DataType',
		(param?: AttributeParameter) => {
			let validator: string | undefined = undefined;

			switch (param) {
				case 'DataType.Password':
					validator = `min(4)`;
					break;
				case 'DataType.EmailAddress':
					validator = `email(getEmailValidationMessage)`;
					break;
				default:
					break;
			}

			return validator;
		},
	],
	['MinLength', (param?: AttributeParameter) => `min(${param ?? 1})`],
	['EmailAddress', () => `email(getEmailValidationMessage)`],
]);

/**
 * @deprecated
 */
type BaseParsedPropertyType = {
	name: string;
	type: string;
	isNullable: boolean;
	isEnum: boolean;
	isPrimitive: boolean;
	isArray: boolean;
};

/**
 * @deprecated
 */
export type ParsedPropertyType = BaseParsedPropertyType & {
	arrayLevels?: number;
};

/**
 * @deprecated
 */
export type ParsedPropertyAttribute = {
	name: string;
	parameters: Array<AttributeParameter>;
};

/**
 * @deprecated
 */
export type ParsedPropertyWithAttributes = BaseParsedPropertyType & {
	attributes: Array<ParsedPropertyAttribute>;
};

/**
 * @deprecated
 */
export function getTypescriptClassName(className: string): string {
	return className.replace('Dto', '');
}

export function pluralize(word: string): string {
	return plur(word, 2);
}

export function toCamelCase(text: string) {
	return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) {
			return '';
		}
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

/**
 * @deprecated
 */
export function isPrimitive(type: string): boolean {
	const primitives = ['boolean', 'number', 'string'];
	return primitives.includes(type);
}

/**
 * @deprecated
 */
export function isEnum(type: string): boolean {
	const childType = extractChildType(type);

	if (isPrimitive(childType)) {
		return false;
	}

	return !childType.endsWith('Dto');
}

/**
 * @deprecated
 */
export function isOptionsDto(type: string): boolean {
	return type.includes('Options');
}

/**
 * @deprecated
 */
export function hasValidationAttributes(content: string): boolean {
	return VALIDATION_ATTRIBUTES.some((o) => content.includes(o));
}

/**
 * @deprecated
 */
export function extractChildType(type: string): string {
	if (!type.includes('Array')) {
		return type;
	}

	const matched = type.match(/<(.*)>/)?.[1] ?? type;

	return matched.includes('Array') ? extractChildType(matched) : matched;
}

export function toKebabCase(text: string): string {
	return (
		text
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.join('-')
			.toLowerCase() ?? text
	);
}

/**
 * @deprecated
 */
export function getFullType(type: string, isArray: boolean, arrayLevels: number = 0) {
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

/**
 * @deprecated
 */
export function getConstructorSuffix({
	name,
	type,
	isArray,
	isEnum,
	isNullable,
	isPrimitive,
}: ParsedPropertyType): string {
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

export function array(size: number) {
	return new Array(size).fill(null).map((_, i) => i);
}

export function arrayUnique<T>(list: Array<T>, sort = true): Array<T> {
	const result = Array.from(new Set(list));
	return sort ? result.sort() : result;
}

export async function pathExistsAsync(path: PathLike) {
	try {
		return !!(await _statAsync(path));
	} catch (error) {
		return false;
	}
}

export async function removeDirAsync(path: PathLike, recursive = true) {
	const exists = await pathExistsAsync(path);

	if (!exists) {
		return;
	}

	await _rmAsync(path, {recursive});
}

export async function createDirAsync(path: PathLike, recursive = false) {
	if (await pathExistsAsync(path)) {
		return path;
	}

	return _mkdirAsync(path, {
		recursive,
	});
}

export async function createFileAsync(name: string, path: string, content: string = '') {
	return _writeFileAsync(join(path, name), content, {
		encoding: 'utf-8',
	});
}

export async function readFileAsync(path: PathLike): Promise<string> {
	return _readFileAsync(path, 'utf-8');
}

export async function readDirAsync(path: PathLike) {
	const exists = await pathExistsAsync(path);
	return exists ? _readdirAsync(path, {encoding: 'utf-8'}) : [];
}
