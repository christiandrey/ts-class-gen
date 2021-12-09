import {transformToAdaptersAsync} from './adapters';
import {transformToApiAsync} from './api';
import {transformToEntitiesAsync} from './entities';
import {transformToNormalizationSchemasAsync} from './schemas/normalization';
import {transformToOptionsAsync} from './options';
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

	await transformToTypingsAsync(enums);

	console.table({
		Entities: entities.length,
		Options: options.length,
		ValidationSchemas: validationSchemas.length,
		NormalizationSchemas: normalizationSchemas.length,
		Adapters: adapters.length,
		Endpoints: api.flatMap((o) => o.actions).length,
		Thunks: thunks.length,
		Slices: slices.length,
	});
}

async function tempAsync() {}

export const transformer = {
	runAsync,
	tempAsync,
};
