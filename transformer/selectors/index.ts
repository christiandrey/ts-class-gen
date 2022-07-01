import {GeneratedNormalizationSchema, GeneratedSelector} from '../types';
import {
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	removeDirAsync,
	toCamelCase,
} from '../../utils';
import {enterEmitterScope, leaveEmitterScope} from '../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {join} from 'path';
import {paths} from '../paths';

function generateSelector(normalizationSchema: GeneratedNormalizationSchema): GeneratedSelector {
	const {name, entitiesImports} = normalizationSchema;
	const camelName = toCamelCase(name);
	const combinedEntities = arrayUnique([name, ...entitiesImports]);
	const stringifiedEntities = combinedEntities
		.map((o) =>
			toCamelCase(o) === camelName ? toCamelCase(getPlural(o)) : `${toCamelCase(o)}Relations`,
		)
		.join(', ');
	// const stringifiedEntities_ = combinedEntities.map((o) => toCamelCase(getPlural(o))).join(', ');
	const typescriptEmitter = new TypeScriptEmitter();

	enterEmitterScope(
		typescriptEmitter,
		`export const ${camelName}RelationsSelector = createSelector(`,
	);

	combinedEntities.forEach((o) => {
		const relationCamelName = toCamelCase(o);
		typescriptEmitter.writeLine(
			`${toCamelCase(o)}${relationCamelName === camelName ? 'Entities' : 'Relations'}Selector,`,
		);
	});

	typescriptEmitter.writeLine(
		`(${stringifiedEntities}) => ({${stringifiedEntities.replace(
			/([a-zA-Z]*?Relations)/gim,
			'...$1',
		)}}),`,
	);

	leaveEmitterScope(typescriptEmitter, ');');

	return {
		name: `${camelName}RelationsSelector`,
		data: typescriptEmitter.output,
		entitiesImports: combinedEntities,
	};
}

export async function transformToSelectorsAsync(
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
) {
	const dir = paths.SELECTORS_FOLDER;

	await removeDirAsync(join(dir, 'dtos.d.ts'));
	await createDirAsync(dir);

	const selectors = normalizationSchemas.map(generateSelector);
	const typescriptEmitter = new TypeScriptEmitter();

	typescriptEmitter.writeLine(
		`import {${arrayUnique(selectors.flatMap((o) => o.entitiesImports))
			.map((o) => `${toCamelCase(o)}EntitiesSelector`)
			.join(', ')}} from '../../data/adapters'`,
	);
	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(`import {createSelector} from '@reduxjs/toolkit';`);
	typescriptEmitter.ensureNewParagraph();

	for (const selector of selectors) {
		typescriptEmitter.write(selector.data);
		typescriptEmitter.ensureNewParagraph();
	}

	await createFileAsync('index.ts', dir, typescriptEmitter.output);

	return selectors;
}
