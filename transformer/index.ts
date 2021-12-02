import {getPlural} from '../utils';
import {transformToAdaptersAsync} from './adapters';
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
		)} and ${adapters.length} ${getPlural('adapter', adapters.length)}.`,
	);
}

export const transformer = {
	runAsync,
};
