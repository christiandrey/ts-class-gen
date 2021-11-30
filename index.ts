import { EmittedContent, parser } from "./parser";
import {
  arrayUnique,
  createDirAsync,
  createFileAsync,
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

  const entities: Array<EmittedContent> = [];
  const dtos = await readDirAsync(DTOS_FOLDER);

  for (const dto of dtos) {
    const content = await readFileAsync(join(DTOS_FOLDER, dto));
    const parsed = parser.emitClasses(content);
    entities.push(...parsed);
  }

  for (const entity of entities) {
    await createFileAsync(
      `${toKebabCase(entity.name)}.ts`,
      ENTITIES_FOLDER,
      entity.emitted
    );
  }

  const enums = arrayUnique(entities.flatMap((o) => o.enums));
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
    await createDirAsync(TYPINGS_FOLDER);
    await createFileAsync(
      "index.d.ts",
      TYPINGS_FOLDER,
      parsedEnums.map((o) => `export ${o}`).join("\n\n")
    );
  }
}

run();
