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
	getFullPropertyType,
	getTsClassName,
	isClass,
	isClassDto,
	isOptionsDto,
} from '../utils';

import {GeneratedOption} from '../types';
import {join} from 'path';
import {paths} from '../paths';

function generateOption(source: string, index = 0): GeneratedOption {
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
				const entityClassName = (name = getTsClassName(entityClass.name));
				const entityProperties = entityClass.properties.map(getClassPropertyMapper(typeEmitter));

				entitiesImports = arrayUnique(entityProperties.filter(isClass).map((o) => o.type));
				typingsImports = arrayUnique(entityProperties.filter((o) => o.isEnum).map((o) => o.type));

				typescriptEmitter.enterScope(`export type ${entityClassName} = {`);

				entityProperties.forEach(({type, name, isNullable, isArray, isEnum, arrayLevels}) => {
					typescriptEmitter.writeLine(
						`${name}${isNullable ? '?' : ''}: ${getFullPropertyType(type, isArray, arrayLevels)};`,
					);
				});

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

function generateOptions(source: string): Array<GeneratedOption> {
	const size = getClassesSize(source);
	return array(size).map((o) => generateOption(source, o));
}

export async function transformToOptionsAsync() {
	const dir = paths.TYPINGS_FOLDER;

	await removeDirAsync(join(dir, 'dtos.d.ts'));
	await createDirAsync(dir);

	const dtos = await getDtosAsync(isOptionsDto);
	const options = dtos.flatMap((o) => generateOptions(o));

	if (!options.length) {
		return options;
	}

	const exports: Array<string> = [];
	const typingsImports = arrayUnique(options.flatMap((o) => o.typingsImports));
	const entitiesImports = arrayUnique(options.flatMap((o) => o.entitiesImports).filter(isClassDto));

	exports.push(`import {${typingsImports.join(', ')}} from '.';`);
	exports.push(
		...entitiesImports.map((o) => `import {${o}} from '../entities/${toKebabCase(o)}';\n`),
	);
	exports.push('');
	exports.push(...options.map((o) => `${o.data}\n`));

	await createFileAsync('dtos.d.ts', dir, exports.join('\n'));

	return options;
}
