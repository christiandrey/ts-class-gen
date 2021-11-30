import {
  EmittedClass,
  EmittedDto,
  EmittedValidationSchema,
  parser,
} from "./parser";
import {
  arrayUnique,
  createDirAsync,
  createFileAsync,
  isOptionsDto,
  pathExistsAsync,
  readDirAsync,
  readFileAsync,
  removeDirAsync,
  toCamelCase,
  toKebabCase,
} from "./utils";

import { cwd } from "process";
import { join } from "path";

const ROOT = cwd();
const DTOS_FOLDER = join(ROOT, "dtos");
const ENUMS_FOLDER = join(ROOT, "enums");
const ENTITIES_FOLDER = join(ROOT, "entities");
const TYPINGS_FOLDER = join(ROOT, "typings");
const VALIDATION_SCHEMAS_FOLDER = join(ROOT, "schemas", "validation");

async function run() {
  await removeDirAsync(ENTITIES_FOLDER);
  await removeDirAsync(TYPINGS_FOLDER);
  await removeDirAsync(VALIDATION_SCHEMAS_FOLDER);
  await createDirAsync(ENTITIES_FOLDER);
  await createDirAsync(TYPINGS_FOLDER);
  await createDirAsync(VALIDATION_SCHEMAS_FOLDER, true);

  const entities: Array<EmittedClass> = [];
  const options: Array<EmittedDto> = [];
  const validationSchemas: Array<EmittedValidationSchema> = [];
  const dtos = await readDirAsync(DTOS_FOLDER);
  const classDtos = dtos.filter((o) => !isOptionsDto(o));
  const optionsDtos = dtos.filter(isOptionsDto);
  let entitiesExportContent = "",
    validationSchemasExportContent = "";

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

  for (const dto of dtos) {
    const content = await readFileAsync(join(DTOS_FOLDER, dto));
    const parsed = parser.emitValidationSchemas(content);
    validationSchemas.push(...parsed);
  }

  for (const entity of entities) {
    await createFileAsync(
      `${toKebabCase(entity.name)}.ts`,
      ENTITIES_FOLDER,
      entity.emitted
    );

    entitiesExportContent += `import {${entity.name}} from './${toKebabCase(
      entity.name
    )}';\n`;
  }

  for (const validationSchema of validationSchemas) {
    await createFileAsync(
      `${toKebabCase(validationSchema.name)}.ts`,
      VALIDATION_SCHEMAS_FOLDER,
      validationSchema.emitted
    );

    validationSchemasExportContent += `import ${toCamelCase(
      validationSchema.name
    )} from './${toKebabCase(validationSchema.name)}';\n`;
  }

  if (entitiesExportContent.length) {
    entitiesExportContent += "\n";
    entitiesExportContent += `export {${entities
      .map((o) => o.name)
      .join(",")}}`;

    await createFileAsync("index.ts", ENTITIES_FOLDER, entitiesExportContent);
  }

  if (validationSchemasExportContent.length) {
    validationSchemasExportContent += "\n";
    validationSchemasExportContent += `export const validationSchemas = {${validationSchemas
      .map((o) => toCamelCase(o.name))
      .join(",")}}`;

    await createFileAsync(
      "index.ts",
      VALIDATION_SCHEMAS_FOLDER,
      validationSchemasExportContent
    );
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
