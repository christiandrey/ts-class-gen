import {
	createDirAsync,
	createFileAsync,
	getPlural,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../utils';
import {enterEmitterScope, leaveEmitterScope} from '../utils';

import {GeneratedAdapter} from '../types';
import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {paths} from '../paths';

export function generateAdapter(entityClassName: string): GeneratedAdapter {
	const typescriptEmitter = new TypeScriptEmitter();
	const camelForm = toCamelCase(entityClassName);
	const pluralForm = getPlural(entityClassName);
	const camelPluralForm = toCamelCase(pluralForm);

	typescriptEmitter.writeLine(`import {GlobalState} from '../..';`);
	typescriptEmitter.writeLine(`import {Normalized} from '../../../typings/state';`);
	typescriptEmitter.writeLine(`import {${entityClassName}} from '../../../entities';`);
	typescriptEmitter.writeLine(`import {createEntityAdapter} from '@reduxjs/toolkit';`);
	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(
		`const ${camelPluralForm}Adapter = createEntityAdapter<Normalized<${entityClassName}>>();`,
	);
	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(
		`const selectors = ${camelPluralForm}Adapter.getSelectors<GlobalState>((state) => state.${camelPluralForm});`,
	);
	typescriptEmitter.ensureNewParagraph();

	enterEmitterScope(typescriptEmitter, 'export const {');
	typescriptEmitter.writeLine(`selectById: ${camelForm}ByIdSelector,`);
	typescriptEmitter.writeLine(`selectAll: all${pluralForm}Selector,`);
	typescriptEmitter.writeLine(`selectEntities: ${camelForm}EntitiesSelector,`);
	leaveEmitterScope(typescriptEmitter, '} = selectors;');

	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(`export default ${camelPluralForm}Adapter;`);

	const data = typescriptEmitter.output;

	return {
		name: entityClassName,
		data,
	};
}

export function generateAdapters(entityClassNames: Array<string>): Array<GeneratedAdapter> {
	return entityClassNames.map(generateAdapter);
}

export async function transformToAdaptersAsync(entityClassNames: Array<string>) {
	const dir = paths.ADAPTERS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const adapters = generateAdapters(entityClassNames);

	for (const {name, data} of adapters) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	if (entityClassNames.length) {
		const exports = entityClassNames.map((o) => `export * from './${toKebabCase(o)}';`);
		await createFileAsync('index.ts', dir, exports.join('\n'));
	}

	return adapters;
}
