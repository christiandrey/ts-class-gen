import {getPlural} from '../utils';
import {transformToEntitiesAsync} from './entities';
import {transformToNormalizationSchemas} from './schemas/normalization';
import {transformToOptionsAsync} from './options';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemas} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();
	const validationSchemas = await transformToValidationSchemas();
	const normalizationSchemas = await transformToNormalizationSchemas();

	await transformToTypingsAsync([...entities, ...options].flatMap((o) => o.enums));

	console.log(
		`Generated ${entities.length} ${getPlural('entity', entities.length)}, ${
			options.length
		} dto ${getPlural('type', options.length)}, ${validationSchemas.length} validation ${getPlural(
			'schema',
			validationSchemas.length,
		)} and ${normalizationSchemas.length} normalization ${getPlural(
			'schema',
			normalizationSchemas.length,
		)}.`,
	);
}

export const transformer = {
	runAsync,
};
