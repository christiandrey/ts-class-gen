import {cwd} from 'process';
import {join} from 'path';

const ROOT = cwd();

export const paths = {
	ROOT,
	DTOS_FOLDER: join(ROOT, 'dtos'),
	ENUMS_FOLDER: join(ROOT, 'enums'),
	ENTITIES_FOLDER: join(ROOT, 'entities'),
	TYPINGS_FOLDER: join(ROOT, 'typings'),
	VALIDATION_SCHEMAS_FOLDER: join(ROOT, 'schemas', 'validation'),
};