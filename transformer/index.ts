import {getPlural} from '../utils';
import {transformToEntitiesAsync} from './entities';
import {transformToOptionsAsync} from './options';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemas} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();
	const validationSchemas = await transformToValidationSchemas();

	await transformToTypingsAsync([...entities, ...options].flatMap((o) => o.enums));

	console.log(
		`Generated ${entities.length} ${getPlural('entity', entities.length)}, ${
			options.length
		} dto ${getPlural('type', options.length)} and ${
			validationSchemas.length
		} validation ${getPlural('schema', validationSchemas.length)}.`,
	);
}

export const transformer = {
	runAsync,
};
