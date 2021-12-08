import {Logger, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {
	array,
	arrayUnique,
	createDirAsync,
	createFileAsync,
	getPlural,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../../utils';
import {
	enterEmitterScope,
	getClassPropertyMapper,
	getClassesSize,
	getDtosAsync,
	getTsClassName,
	isBaseDto,
	isClass,
	isClassDto,
	isLiteDto,
	leaveEmitterScope,
} from '../../utils';

import {GeneratedNormalizationSchema} from '../../types';
import {TypeScriptEmitter} from '@fluffy-spoon/csharp-to-typescript-generator/dist/src/TypeScriptEmitter';
import {parser} from '../../parser';
import {paths} from '../../paths';

async function generateNormalizationSchema(
	source: string,
	index = 0,
): Promise<GeneratedNormalizationSchema | undefined> {
	let name = '';
	const logger = new Logger();
	const typescriptEmitter = new TypeScriptEmitter(logger);
	const file = parser.parseSource(source);
	const typeEmitter = new TypeEmitter(typescriptEmitter);
	const entityClass = file.getAllClassesRecursively()[index];
	const entityClassName = (name = getTsClassName(entityClass.name));
	const entitiesImports: Array<string> = [];

	if (isLiteDto(entityClassName) || isBaseDto(entityClassName)) {
		return;
	}

	const entityPropertiesRaw = await parser.parseFilePropertiesAsync(file, index, true);

	if (!entityPropertiesRaw.some((o) => o.name === 'Id')) {
		return;
	}

	const entityProperties = entityPropertiesRaw
		.map(getClassPropertyMapper(typeEmitter))
		.filter(isClass);

	arrayUnique(entityProperties.map((o) => o.normalizedType)).forEach((o) => {
		typescriptEmitter.writeLine(
			`import {${o}Entities, ${toCamelCase(o)}Schema} from './${toKebabCase(o)}';`,
		);
		entitiesImports.push(o);
	});

	typescriptEmitter.ensureNewParagraph();
	typescriptEmitter.writeLine(`import {${entityClassName}} from '../../entities';`);
	typescriptEmitter.writeLine(`import {SchemaEntities} from '../../typings/state';`);
	typescriptEmitter.writeLine(`import {schema} from 'normalizr';`);
	typescriptEmitter.ensureNewParagraph();

	if (entityProperties.length) {
		enterEmitterScope(
			typescriptEmitter,
			`export const ${toCamelCase(entityClassName)}Schema = new schema.Entity('${getPlural(
				toCamelCase(entityClassName),
			)}', {`,
		);

		entityProperties.forEach(({name, normalizedType, isArray}) => {
			const schemaName = `${toCamelCase(normalizedType)}Schema`;
			typescriptEmitter.writeLine(`${name}: ${isArray ? `[${schemaName}]` : schemaName},`);
		});

		leaveEmitterScope(typescriptEmitter, '});');
	} else {
		typescriptEmitter.writeLine(
			`export const ${toCamelCase(entityClassName)}Schema = new schema.Entity('${getPlural(
				toCamelCase(entityClassName),
			)}');`,
		);
	}

	typescriptEmitter.ensureNewParagraph();

	typescriptEmitter.writeLine(`export type ${entityClassName}Entities = SchemaEntities<{`);
	typescriptEmitter.increaseIndentation();
	typescriptEmitter.writeLine(`${toCamelCase(entityClassName)}: ${entityClassName};`);
	typescriptEmitter.decreaseIndentation();
	typescriptEmitter.write('}>');

	if (entityProperties.length) {
		typescriptEmitter.write(' & ');
		typescriptEmitter.write(
			entityProperties.map(({normalizedType}) => `${normalizedType}Entities`).join(' & '),
		);
		typescriptEmitter.write(';');
	}

	const data = typescriptEmitter.output;

	if (data.length) {
		return {
			name,
			data,
			entitiesImports,
		};
	}
}

async function generateNormalizationSchemas(
	source: string,
): Promise<Array<GeneratedNormalizationSchema>> {
	const size = getClassesSize(source);
	const schemas: Array<GeneratedNormalizationSchema> = [];

	for (const i of array(size)) {
		const schema = await generateNormalizationSchema(source, i);
		schema && schemas.push(schema);
	}

	return schemas;
}

export async function transformToNormalizationSchemasAsync() {
	const dir = paths.NORMALIZATION_SCHEMAS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir, true);

	const dtos = await getDtosAsync(isClassDto);
	const normalizationSchemas: Array<GeneratedNormalizationSchema> = [];

	for (const dto of dtos) {
		normalizationSchemas.push(...(await generateNormalizationSchemas(dto)));
	}

	for (const {name, data} of normalizationSchemas) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	return normalizationSchemas;
}
