import { EmittedClass, EmittedDto, parser } from "./parser";
import {
  arrayUnique,
  createDirAsync,
  createFileAsync,
  isOptionsDto,
  pathExistsAsync,
  readDirAsync,
  readFileAsync,
  removeDirAsync,
  toKebabCase,
} from "./utils";

import { cwd } from "process";
import { join } from "path";

const ROOT = cwd();
const DTOS_FOLDER = join(ROOT, "dtos");
const ENUMS_FOLDER = join(ROOT, "enums");
const ENTITIES_FOLDER = join(ROOT, "entities");
const TYPINGS_FOLDER = join(ROOT, "typings");

async function run() {
  await removeDirAsync(ENTITIES_FOLDER);
  await removeDirAsync(TYPINGS_FOLDER);
  await createDirAsync(ENTITIES_FOLDER);
  await createDirAsync(TYPINGS_FOLDER);

  const entities: Array<EmittedClass> = [];
  const options: Array<EmittedDto> = [];
  const dtos = await readDirAsync(DTOS_FOLDER);
  const classDtos = dtos.filter((o) => !isOptionsDto(o));
  const optionsDtos = dtos.filter(isOptionsDto);
  let entityExportContent = "";

  for (const classDto of classDtos) {
    const content = await readFileAsync(join(DTOS_FOLDER, classDto));
    const parsed = parser.emitClasses(content);
    entities.push(...parsed);
  }

  for (const optionDto of optionsDtos) {
    const content = await readFileAsync(join(DTOS_FOLDER, optionDto));
    const parsed = parser.emitDtos(content);
    options.push(...parsed);
  }

  for (const entity of entities) {
    await createFileAsync(
      `${toKebabCase(entity.name)}.ts`,
      ENTITIES_FOLDER,
      entity.emitted
    );

    entityExportContent += `import {${entity.name}} from './${toKebabCase(
      entity.name
    )}';\n`;
  }

  if (entityExportContent.length) {
    entityExportContent += "\n";
    entityExportContent += `export {${entities.map((o) => o.name).join(",")}}`;

    await createFileAsync("index.ts", ENTITIES_FOLDER, entityExportContent);
  }

  if (options.length) {
    let content = "";

    const entitiesImports = arrayUnique(
      options.flatMap((o) => o.entitiesImports)
    )
      .filter((o) => !isOptionsDto(o))
      .sort();
    const typingsImports = arrayUnique(
      options.flatMap((o) => o.typingsImports)
    ).sort();

    if (typingsImports.length) {
      content += `import {${typingsImports.join(", ")}} from '.';\n`;
    }

    for (const entityImport of entitiesImports) {
      content += `import {${entityImport}} from '../entities/${toKebabCase(
        entityImport
      )}';\n`;
    }

    content += "\n";
    content += options.map((o) => o.emitted).join("\n\n");

    await createFileAsync("dtos.d.ts", TYPINGS_FOLDER, content);
  }

  const enums = arrayUnique(
    entities.flatMap((o) => o.enums).concat(options.flatMap((o) => o.enums))
  ).sort();
  const parsedEnums: Array<string> = [];

  for (const enumName of enums) {
    const enumPath = join(ENUMS_FOLDER, `${enumName}.cs`);
    const exists = await pathExistsAsync(enumPath);

    if (exists) {
      const content = await readFileAsync(enumPath);
      const parsed = parser.emitEnum(content);
      parsedEnums.push(parsed);
    }
  }

  if (parsedEnums.length) {
    await createFileAsync(
      "index.d.ts",
      TYPINGS_FOLDER,
      parsedEnums.map((o) => `export ${o}`).join("\n\n")
    );
  }
}

run();
