import {Emitter, TypeEmitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {
	array,
	arrayUnique,
	createDirAsync,
	createFileAsync,
	removeDirAsync,
	toKebabCase,
} from '../../utils';
import {
	getClassPropertyMapper,
	getClassesSize,
	getDtosAsync,
	getEntityConstructorSuffix,
	getFullPropertyType,
	getTsClassName,
	isClass,
	isClassDto,
} from '../utils';

import {GeneratedEntity} from '../types';
import {paths} from '../paths';

function generateEntity(source: string, index = 0): GeneratedEntity {
	let name = '';

	let entitiesImports: Array<string> = [];
	let typingsImports: Array<string> = [];
	const emitter = new Emitter(source);
	const data = emitter.emit({
		file: {
			onBeforeEmit: (file, typescriptEmitter) => {
				typescriptEmitter.clear();

				const typeEmitter = new TypeEmitter(typescriptEmitter);
				const entityClass = file.getAllClassesRecursively()[index];
				const entityInherits = !!entityClass.inheritsFrom.length;
				const entityParents = entityClass.inheritsFrom.map((o) => getTsClassName(o.name));
				const entityClassName = (name = getTsClassName(entityClass.name));
				const entityProperties = entityClass.properties.map(getClassPropertyMapper(typeEmitter));

				entitiesImports = arrayUnique(
					entityProperties
						.filter(isClass)
						.map((o) => o.type)
						.concat(entityParents),
				);
				typingsImports = arrayUnique(entityProperties.filter((o) => o.isEnum).map((o) => o.type));

				if (typingsImports.length) {
					typescriptEmitter.writeLine(`import {${typingsImports.join(', ')}} from '../typings';`);
				}

				entitiesImports.forEach((o) => {
					typescriptEmitter.writeLine(`import {${o}} from './${toKebabCase(o)}';`);
				});

				typescriptEmitter.ensureNewParagraph();
				typescriptEmitter.enterScope(
					`export class ${entityClassName}${
						entityInherits ? ` extends ${entityParents.join(', ')}` : ''
					} {`,
				);

				entityProperties.forEach(({type, name, isNullable, isArray, isEnum, arrayLevels}) => {
					typescriptEmitter.writeLine(
						`${name}${isNullable ? '?' : ''}: ${getFullPropertyType(type, isArray, arrayLevels)};`,
					);
				});

				typescriptEmitter.ensureNewParagraph();
				typescriptEmitter.enterScope(`constructor(dto: ${entityClassName}) {`);

				if (entityInherits) {
					typescriptEmitter.writeIndentation();
					typescriptEmitter.writeLine(`super(dto);`);
					typescriptEmitter.ensureNewParagraph();
				}

				entityProperties.forEach((o) => {
					const {name} = o;
					typescriptEmitter.writeIndentation();
					typescriptEmitter.writeLine(`this.${name} = ${getEntityConstructorSuffix(o)};`);
					typescriptEmitter.ensureNewLine();
				});

				typescriptEmitter.leaveScope();
				typescriptEmitter.leaveScope();
			},
		},
	});

	return {
		name,
		data,
		entitiesImports,
		typingsImports,
	};
}

function generateEntities(source: string): Array<GeneratedEntity> {
	const size = getClassesSize(source);
	return array(size).map((o) => generateEntity(source, o));
}

export async function transformToEntitiesAsync() {
	const dir = paths.ENTITIES_FOLDER;

	await removeDirAsync(dir);
	await createDirAsync(dir);

	const dtos = await getDtosAsync(isClassDto);
	const entities = dtos.flatMap((o) => generateEntities(o));
	const exports = entities.map(({name}) => `import {${name}} from './${toKebabCase(name)}';`);

	if (exports.length) {
		exports.push('', `export {${entities.map((o) => o.name).join(',')}}`);
	}

	for (const {name, data} of entities) {
		await createFileAsync(`${toKebabCase(name)}.ts`, dir, data);
	}

	await createFileAsync('index.ts', dir, exports.join('\n'));

	return entities;
}
