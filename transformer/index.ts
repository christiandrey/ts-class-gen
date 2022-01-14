import {transformToAdaptersAsync} from './adapters';
import {transformToApiAsync} from './api';
import {transformToDocsAsync} from './docs';
import {transformToEntitiesAsync} from './entities';
import {transformToNormalizationSchemasAsync} from './schemas/normalization';
import {transformToOptionsAsync} from './options';
import {transformToSelectorsAsync} from './selectors';
import {transformToSlicesAsync} from './slices';
import {transformToThunksAsync} from './thunks/index';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemasAsync} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();
	const validationSchemas = await transformToValidationSchemasAsync();
	const normalizationSchemas = await transformToNormalizationSchemasAsync();
	const adapters = await transformToAdaptersAsync(normalizationSchemas.map((o) => o.name));
	const api = await transformToApiAsync();
	const enums = [...entities, ...options].flatMap((o) => o.typingsImports);
	const thunkCollections = await transformToThunksAsync({
		controllers: api,
		entities,
		enums,
		normalizationSchemas,
		options,
	});
	const thunks = thunkCollections.flatMap((o) => o.thunks);
	const slices = await transformToSlicesAsync(thunks, normalizationSchemas);
	const selectors = await transformToSelectorsAsync(normalizationSchemas);

	await transformToTypingsAsync(enums);
	await transformToDocsAsync(
		entities,
		enums,
		options,
		normalizationSchemas,
		validationSchemas,
		thunks,
		selectors,
	);

	console.table({
		Entities: entities.length,
		Options: options.length,
		ValidationSchemas: validationSchemas.length,
		NormalizationSchemas: normalizationSchemas.length,
		Adapters: adapters.length,
		Endpoints: api.flatMap((o) => o.actions).length,
		Thunks: thunks.length,
		Slices: slices.length,
		Selectors: selectors.length,
	});
}

async function tempAsync() {}

export const transformer = {
	runAsync,
	tempAsync,
};
