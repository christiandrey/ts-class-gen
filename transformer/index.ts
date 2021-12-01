import {transformToEntitiesAsync} from './entities';
import {transformToOptionsAsync} from './options';
import {transformToTypingsAsync} from './enums';
import {transformToValidationSchemas} from './schemas/validation';

async function runAsync() {
	const entities = await transformToEntitiesAsync();
	const options = await transformToOptionsAsync();

	await transformToTypingsAsync([...entities, ...options].flatMap((o) => o.enums));
	await transformToValidationSchemas();
}

export const transformer = {
	runAsync,
};
