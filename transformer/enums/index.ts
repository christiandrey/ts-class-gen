import {
	arrayUnique,
	createDirAsync,
	createFileAsync,
	pathExistsAsync,
	readFileAsync,
	removeDirAsync,
} from '../../utils';

import {Emitter} from '@fluffy-spoon/csharp-to-typescript-generator';
import {GeneratedEnum} from '../types';
import {join} from 'path';
import {paths} from '../paths';

function generateEnum(source: string): GeneratedEnum {
	const emitter = new Emitter(source);
	const data = emitter.emit({
		defaults: {
			namespaceEmitOptions: {
				skip: true,
			},
			enumEmitOptions: {
				declare: false,
				strategy: 'string-union',
			},
		},
	});

	return {data};
}

export async function transformToTypingsAsync(enums: Array<string> = []) {
	const dir = paths.TYPINGS_FOLDER;
	const resolvedEnums: Array<GeneratedEnum> = [];

	await removeDirAsync(join(dir, 'index.d.ts'));
	await createDirAsync(dir);

	for (const enumName of arrayUnique(enums)) {
		const enumPath = join(paths.ENUMS_FOLDER, `${enumName}.cs`);
		const enumExists = await pathExistsAsync(enumPath);

		if (enumExists) {
			const content = await readFileAsync(enumPath);
			const data = generateEnum(content);
			resolvedEnums.push(data);
		}
	}

	if (resolvedEnums.length) {
		await createFileAsync(
			'index.d.ts',
			dir,
			resolvedEnums.map(({data}) => `export ${data}`).join('\n\n'),
		);
	}
}
