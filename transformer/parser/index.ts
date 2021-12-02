import {
	CSharpClass,
	CSharpFile,
	CSharpProperty,
} from '@fluffy-spoon/csharp-to-typescript-generator';
import {pathExistsAsync, readFileAsync} from '../../utils';

import {FileParser} from '@fluffy-spoon/csharp-parser';
import {join} from 'path';
import {paths} from '../paths';

function parseSource(source: string) {
	const fileParser = new FileParser(source);
	return fileParser.parseFile() as unknown as CSharpFile;
}

async function parseFileAsync(path: string) {
	const data = await readFileAsync(path);
	return parseSource(data);
}

async function parseClassPropertiesAsync(
	entity: CSharpClass,
	recursive = false,
	collection: Array<CSharpClass> = [],
): Promise<Array<CSharpProperty>> {
	const entityProperties = entity.properties;
	const entityParents = entity.inheritsFrom;

	if (!recursive || !entityParents.length) {
		return entityProperties;
	}

	for (const entityParent of entityParents) {
		const resolved = collection.find((o) => o.name === entityParent.name);

		if (resolved) {
			entityProperties.push(...(await parseClassPropertiesAsync(resolved, true)));
		} else {
			const path = join(paths.DTOS_FOLDER, `${entityParent.name}.cs`);
			const pathExists = await pathExistsAsync(path);

			if (pathExists) {
				const parentFile = await parseFileAsync(path);
				const parentFileEntities = parentFile.getAllClassesRecursively();
				const parentEntity = parentFileEntities.find((o) => o.name === entityParent.name);

				if (parentEntity) {
					entityProperties.push(
						...(await parseClassPropertiesAsync(parentEntity, true, parentFileEntities)),
					);
				}
			}
		}
	}

	return entityProperties;
}

async function parseFilePropertiesAsync(file: CSharpFile, index = 0, recursive = false) {
	const entities = file.getAllClassesRecursively();
	const entity = entities[index];

	return await parseClassPropertiesAsync(entity, recursive, entities);
}

export const parser = {
	parseFilePropertiesAsync,
	parseFileAsync,
	parseSource,
};
