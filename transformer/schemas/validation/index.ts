import {Emitter, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {
	array,
	arrayUnique,
	createDirAsync,
	createFileAsync,
	removeDirAsync,
	toCamelCase,
	toKebabCase,
} from '../../../utils';
import {
	enterEmitterScope,
	getClassPropertyMapper,
	getClassesSize,
	getDtosAsync,
	getPropertyAttributeYupFn,
	getPropertyTypeYupFn,
	getTsClassName,
	leaveEmitterScope,
} from '../../utils';

import {GeneratedValidationSchema} from '../../types';
import {paths} from '../../paths';

function generateValidationSchema(
	source: string,
	index = 0,
): GeneratedValidationSchema | undefined {
	let name = '';

	const emitter = new Emitter(source);
	const data = emitter.emit({
		file: {
			onBeforeEmit: (file, typescriptEmitter) => {
				typescriptEmitter.clear();

				const typeEmitter = new TypeEmitter(typescriptEmitter);
				const entityClass = file.getAllClassesRecursively()[index];
				const entityClassName = (name = getTsClassName(entityClass.name));
				const entityProperties = entityClass.properties.map(getClassPropertyMapper(typeEmitter));
				const mappedProperties = entityProperties
					.filter((o) => !!o.attributes.length)
					.map((o) => ({
						original: o,
						typeYupFn: getPropertyTypeYupFn(o),
						attributesYupFns: arrayUnique(o.attributes.map(getPropertyAttributeYupFn)),
					}));

				if (!mappedProperties.length) {
					return;
				}

				const yupImports = arrayUnique(
					mappedProperties.map((o) => o.typeYupFn.split('(')[0]).concat('object'),
				);
				const utilsImports = ['getEmailValidationMessage', 'getRequiredValidationMessage'].filter(
					(o) =>
						mappedProperties
							.flatMap((p) => p.attributesYupFns)
							.some((p) => p?.includes(o.slice(3, -17).toLowerCase())),
				);

				if (utilsImports.length) {
					typescriptEmitter.writeLine(`import {${utilsImports.join(', ')}} from './utils';`);
				}

				if (yupImports.length) {
					typescriptEmitter.writeLine(`import {${yupImports.join(', ')}} from 'yup';`);
				}

				typescriptEmitter.ensureNewParagraph();
				enterEmitterScope(typescriptEmitter, `const ${toCamelCase(entityClassName)} = object({`);

				mappedProperties.forEach(({original, typeYupFn, attributesYupFns}) => {
					typescriptEmitter.writeLine(
						`${original.name}: ${[typeYupFn, ...attributesYupFns.filter((o) => !!o)].join('.')},`,
					);
				});

				leaveEmitterScope(typescriptEmitter, '});');
				typescriptEmitter.ensureNewParagraph();
				typescriptEmitter.writeLine(`export default ${toCamelCase(entityClassName)};`);
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

function generateValidationSchemas(source: string): Array<GeneratedValidationSchema> {
	const size = getClassesSize(source);
	return array(size)
		.flatMap((o) => generateValidationSchema(source, o))
		.filter((o) => !!o) as Array<GeneratedValidationSchema>;
}

export async function transformToValidationSchemas() {
	const dir = paths.VALIDATION_SCHEMAS_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir, true);

	const dtos = await getDtosAsync();
	const validationSchemas = dtos.flatMap((o) => generateValidationSchemas(o));
	const exports = validationSchemas.map(
		({name}) => `import ${toCamelCase(name)} from './${toKebabCase(name)}';`,
	);

	if (exports.length) {
		exports.push(
			'',
			`export const validationSchemas = {${validationSchemas
				.map((o) => toCamelCase(o.name))
				.join(',')}}`,
		);
	}

	for (const {name, data} of validationSchemas) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	await createFileAsync('index.ts', dir, exports.join('\n'));

	return validationSchemas;
}
