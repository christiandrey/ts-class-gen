import {getPlural} from '../utils';
import {transformToAdaptersAsync} from './adapters';
import {transformToApiAsync} from './api';
import {transformToEntitiesAsync} from './entities';
import {transformToNormalizationSchemasAsync} from './schemas/normalization';
import {transformToOptionsAsync} from './options';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemasAsync} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();
	const validationSchemas = await transformToValidationSchemasAsync();
	const normalizationSchemas = await transformToNormalizationSchemasAsync();
	const adapters = await transformToAdaptersAsync(normalizationSchemas.map((o) => o.name));
	const api = await transformToApiAsync();

	await transformToTypingsAsync([...entities, ...options].flatMap((o) => o.enums));

	console.log(
		`Generated ${entities.length} ${getPlural('entity', entities.length)}, ${
			options.length
		} dto ${getPlural('type', options.length)}, ${validationSchemas.length} validation ${getPlural(
			'schema',
			validationSchemas.length,
		)}, ${normalizationSchemas.length} normalization ${getPlural(
			'schema',
			normalizationSchemas.length,
		)}, ${adapters.length} ${getPlural('adapter', adapters.length)} and ${
			api.flatMap((o) => o.actions).length
		} api ${getPlural('endpoint', api.flatMap((o) => o.actions).length)}.`,
	);
}

async function tempAsync() {}

export const transformer = {
	runAsync,
	tempAsync,
};
