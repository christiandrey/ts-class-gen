import {PathLike, mkdir, readFile, readdir, rm, stat, writeFile} from 'fs';

import {join} from 'path';
import pluralize from 'pluralize';
import {promisify} from 'util';

const _readFileAsync = promisify(readFile);
const _rmAsync = promisify(rm);
const _mkdirAsync = promisify(mkdir);
const _readdirAsync = promisify(readdir);
const _writeFileAsync = promisify(writeFile);
const _statAsync = promisify(stat);

export function getPlural(word: string, count = 2): string {
	return pluralize(word, count);
}

export function toCamelCase(text: string) {
	return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) {
			return '';
		}
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

export function toKebabCase(text: string): string {
	return (
		text
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.join('-')
			.toLowerCase() ?? text
	);
}

export function replaceAll(text: string, searchValue: string, replaceValue: string) {
	const regex = new RegExp(searchValue, 'gm');
	return text.replace(regex, replaceValue);
}

export function array(size: number) {
	return new Array(size).fill(null).map((_, i) => i);
}

export function isDefined<T>(argument: T | undefined): argument is T {
	return argument !== undefined;
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
