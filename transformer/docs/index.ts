import {
	GeneratedEntity,
	GeneratedNormalizationSchema,
	GeneratedOption,
	GeneratedSelector,
	GeneratedThunk,
	GeneratedValidationSchema,
} from '../types';
import {
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	removeDirAsync,
	toCamelCase,
} from '../../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {paths} from '../paths';

export async function transformToDocsAsync(
	entities: Array<GeneratedEntity>,
	enums: Array<string>,
	options: Array<GeneratedOption>,
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
	validationSchemas: Array<GeneratedValidationSchema>,
	thunks: Array<GeneratedThunk>,
	selectors: Array<GeneratedSelector>,
) {
	const dir = paths.DOCS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const typescriptEmitter = new TypeScriptEmitter();

	// ----------------------------------------------
	// Entities
	// ----------------------------------------------

	entities.forEach((o) => {
		typescriptEmitter.writeLine(o.name);
	});

	await createFileAsync('entities.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();

	// ----------------------------------------------
	// Options e.g. creation & update options
	// ----------------------------------------------

	options.forEach((o) => {
		typescriptEmitter.writeLine(o.name);
	});

	await createFileAsync('options.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();

	// ----------------------------------------------
	// Typings
	// ----------------------------------------------

	arrayUnique(enums).forEach((o) => {
		typescriptEmitter.writeLine(o);
	});

	await createFileAsync('typings.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();

	// ----------------------------------------------
	// Validation Schemas
	// ----------------------------------------------

	validationSchemas.forEach((o) => {
		typescriptEmitter.writeLine(toCamelCase(o.name));
	});

	await createFileAsync('validation-schemas.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();

	// ----------------------------------------------
	// Thunks
	// ----------------------------------------------

	thunks.forEach((o) => {
		typescriptEmitter.writeLine(toCamelCase(o.name));
	});

	await createFileAsync('thunks.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();

	// ----------------------------------------------
	// Selectors
	// ----------------------------------------------

	const combinedSelectors = selectors.map((o) => o.name);

	normalizationSchemas.forEach(({name}) => {
		const data = [
			`${toCamelCase(name)}ByIdSelector`,
			`all${getPlural(name)}Selector`,
			`${toCamelCase(name)}EntitiesSelector`,
		];
		combinedSelectors.push(...data);
	});

	arrayUnique(combinedSelectors).forEach((o) => {
		typescriptEmitter.writeLine(o);
	});

	await createFileAsync('selectors.txt', dir, typescriptEmitter.output);

	typescriptEmitter.clear();
}
