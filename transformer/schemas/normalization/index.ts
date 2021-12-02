import {Emitter, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
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
	extendsLiteDto,
	getClassPropertyMapper,
	getClassesSize,
	getDtosAsync,
	getTsClassName,
	isClass,
	isClassDto,
	isLiteDto,
	leaveEmitterScope,
} from '../../utils';

import {GeneratedNormalizationSchema} from '../../types';
import {paths} from '../../paths';

function generateNormalizationSchema(
	source: string,
	index = 0,
): GeneratedNormalizationSchema | undefined {
	let name = '';

	const emitter = new Emitter(source);
	const data = emitter.emit({
		file: {
			onBeforeEmit: (file, typescriptEmitter) => {
				typescriptEmitter.clear();

				const typeEmitter = new TypeEmitter(typescriptEmitter);
				const entityClass = file.getAllClassesRecursively()[index];
				const entityClassName = (name = getTsClassName(entityClass.name));
				const entityParents = entityClass.inheritsFrom.map((o) => getTsClassName(o.name));
				const entityExtendsLite = extendsLiteDto(entityParents);

				if (isLiteDto(entityClassName)) {
					return;
				}

				const entityPropertiesRaw = entityExtendsLite
					? [
							...(file.getAllClassesRecursively()[+!index]?.properties ?? []),
							...entityClass.properties,
					  ]
					: entityClass.properties;
				const entityProperties = entityPropertiesRaw
					.map(getClassPropertyMapper(typeEmitter))
					.filter(isClass);

				arrayUnique(entityProperties.map((o) => o.cleanType)).forEach((o) => {
					typescriptEmitter.writeLine(
						`import {${o}Entities, ${toCamelCase(o)}Schema} from './${toKebabCase(o)}';`,
					);
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

					entityProperties.forEach(({name, cleanType, isArray}) => {
						const schemaName = `${toCamelCase(cleanType)}Schema`;
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
						entityProperties.map(({cleanType}) => `${cleanType}Entities`).join(' & '),
					);
					typescriptEmitter.write(';');
				}
			},
		},
	});

	if (data.length) {
		return {
			name,
			data,
		};
	}
}

function generateNormalizationSchemas(source: string): Array<GeneratedNormalizationSchema> {
	const size = getClassesSize(source);
	return array(size)
		.flatMap((o) => generateNormalizationSchema(source, o))
		.filter((o) => !!o) as Array<GeneratedNormalizationSchema>;
}

export async function transformToNormalizationSchemas() {
	const dir = paths.NORMALIZATION_SCHEMAS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir, true);

	const exclude = [
		'AuthResponseDto',
		'AuthenticateDto',
		'BaseEntityDto',
		'MailAddressDto',
		'MailingDto',
		'PlotPointDto',
		'RegisterDto',
		'ResetPasswordDto',
		'ResourceDto',
		'UpdatedCurrencyDto',
		'UpdatedUserDto',
		'UserPreferenceDto',
		'VerifyEmailDto',
		'VerifyResetCodeDto',
	];
	const dtos = await getDtosAsync(isClassDto, exclude);
	const normalizationSchemas = dtos.flatMap((o) => generateNormalizationSchemas(o));

	for (const {name, data} of normalizationSchemas) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	return normalizationSchemas;
}
