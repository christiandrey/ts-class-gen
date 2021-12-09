import {
	GeneratedNormalizationSchema,
	GeneratedSlice,
	GeneratedThunk,
	SliceGenerator,
} from '../types';
import {
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../utils';
import {enterEmitterScope, leaveEmitterScope} from '../utils';

import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {paths} from '../paths';

function generateSlice(generator: SliceGenerator): GeneratedSlice {
	const {name} = generator;
	const thunks = arrayUnique(generator.thunks.map((o) => toCamelCase(o)));
	const pluralName = getPlural(name);
	const pluralCamelName = toCamelCase(pluralName);
	const typescriptEmitter = new TypeScriptEmitter();
	const hasThunks = thunks.length;

	if (hasThunks) {
		typescriptEmitter.writeLine(`import {${thunks.join(', ')}} from '../thunks';`);
		typescriptEmitter.writeLine(`import {createSlice, isAnyOf} from '@reduxjs/toolkit';`);
	} else {
		typescriptEmitter.writeLine(`import {createSlice} from '@reduxjs/toolkit';`);
	}

	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(
		`import ${pluralCamelName}Adapter from '../adapters/${toKebabCase(name)}';`,
	);
	typescriptEmitter.ensureNewParagraph();

	enterEmitterScope(typescriptEmitter, `export const ${pluralCamelName}Slice = createSlice({`);

	typescriptEmitter.writeLine(`name: '${pluralCamelName}',`);
	typescriptEmitter.writeLine(`initialState: ${pluralCamelName}Adapter.getInitialState(),`);
	typescriptEmitter.writeLine(`reducers: {},`);

	if (hasThunks) {
		enterEmitterScope(typescriptEmitter, 'extraReducers: (builder) => {');
		enterEmitterScope(
			typescriptEmitter,
			`builder.addMatcher(isAnyOf(${thunks
				.map((o) => o + '.fulfilled')
				.join(', ')}), (state, action) => {`,
		);

		typescriptEmitter.writeLine(
			`${pluralCamelName}Adapter.upsertMany(state, action.payload.entities.${pluralCamelName});`,
		);

		leaveEmitterScope(typescriptEmitter, '});');
		leaveEmitterScope(typescriptEmitter, '},');
	}

	leaveEmitterScope(typescriptEmitter, '});');

	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(
		`export const ${pluralCamelName}Reducer = ${pluralCamelName}Slice.reducer;`,
	);
	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(
		`export const ${pluralCamelName}Actions = ${pluralCamelName}Slice.actions;`,
	);

	return {
		name,
		data: typescriptEmitter.output,
	};
}

function getSliceGenerators(
	thunks: Array<GeneratedThunk>,
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
): Array<SliceGenerator> {
	const sliceGenerators: Array<SliceGenerator> = normalizationSchemas.map((o) => ({
		name: o.name,
		thunks: [],
	}));

	for (const thunk of thunks) {
		const responseEntities = thunk.response?.entities ?? [];

		for (const entity of responseEntities) {
			sliceGenerators.find((o) => o.name === entity)?.thunks.push(thunk.name);
		}
	}

	return sliceGenerators;
}

export async function transformToSlicesAsync(
	thunks: Array<GeneratedThunk>,
	normalizationSchemas: Array<GeneratedNormalizationSchema>,
) {
	const dir = paths.SLICES_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const sliceGenerators = getSliceGenerators(thunks, normalizationSchemas);
	const slices = sliceGenerators.map(generateSlice);
	const exports = slices.map(({name}) => `export * from './${toKebabCase(name)}';`);

	for (const {name, data} of slices) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	await createFileAsync('index.ts', dir, exports.join('\n'));

	return slices;
}
