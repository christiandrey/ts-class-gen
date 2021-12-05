import {transformToAdaptersAsync} from './adapters';
import {transformToApiAsync} from './api';
import {transformToEntitiesAsync} from './entities';
import {transformToNormalizationSchemasAsync} from './schemas/normalization';
import {transformToOptionsAsync} from './options';
import {transformToThunksAsync} from './thunks';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemasAsync} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();
	const validationSchemas = await transformToValidationSchemasAsync();
	const normalizationSchemas = await transformToNormalizationSchemasAsync();
	const adapters = await transformToAdaptersAsync(normalizationSchemas.map((o) => o.name));
	const api = await transformToApiAsync();
	const enums = [...entities, ...options].flatMap((o) => o.enums);
	const thunkCollections = await transformToThunksAsync(
		api,
		enums,
		normalizationSchemas.map((o) => o.name),
	);

	await transformToTypingsAsync(enums);

	console.table({
		Entities: entities.length,
		Options: options.length,
		ValidationSchemas: validationSchemas.length,
		NormalizationSchemas: normalizationSchemas.length,
		Adapters: adapters.length,
		Endpoints: api.flatMap((o) => o.actions).length,
		Thunks: thunkCollections.flatMap((o) => o.thunks).length,
	});
}

async function tempAsync() {}

export const transformer = {
	runAsync,
	tempAsync,
};
