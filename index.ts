import {
  Emitter,
  TypeEmitter,
} from "@fluffy-spoon/csharp-to-typescript-generator";
import {
  ParsedPropertyType,
  extractChildType,
  getConstructorSuffix,
  getFullType,
  getTypescriptClassName,
  isEnum,
  isPrimitive,
  toCamelCase,
  toKebabCase,
} from "./utils";

import { readFileSync } from "fs";

const content = readFileSync("./models/ChatDto.cs", "utf-8");
const emitter = new Emitter(content);
const emitted = emitter.emit({
  file: {
    onBeforeEmit: (file, typescriptEmitter) => {
      typescriptEmitter.clear();

      const typeEmitter = new TypeEmitter(typescriptEmitter);
      const entityClass = file.getAllClassesRecursively()[0];
      const entityParents = entityClass.inheritsFrom.map((o) =>
        getTypescriptClassName(o.name)
      );
      const entityClassName = getTypescriptClassName(entityClass.name);
      const entityProperties = entityClass.properties.map(({ name, type }) => {
        const parsedType = typeEmitter.convertTypeToTypeScript(type);
        return {
          name: toCamelCase(name),
          type: getTypescriptClassName(extractChildType(parsedType)),
          arrayLevels: parsedType.match(/Array/g)?.length,
          isArray: parsedType.startsWith("Array"),
          isEnum: isEnum(parsedType),
          isPrimitive: isPrimitive(extractChildType(parsedType)),
          isNullable: type.isNullable,
        } as ParsedPropertyType;
      });
      const importedTypes = entityProperties
        .filter((o) => !o.isPrimitive && !o.isEnum)
        .map((o) => o.type)
        .concat(entityParents)
        .sort();
      const isBaseEntity = entityClassName === "BaseEntity";

      for (const importedType of importedTypes) {
        typescriptEmitter.writeLine(
          `import {${importedType}} from './${toKebabCase(importedType)}';`
        );
      }

      typescriptEmitter.ensureNewParagraph();

      typescriptEmitter.enterScope(
        `export class ${entityClassName}${
          entityParents.length ? ` extends ${entityParents.join(", ")}` : ""
        } {`
      );

      for (const entityProperty of entityProperties) {
        const { type, name, isNullable, isArray, arrayLevels } = entityProperty;
        typescriptEmitter.writeIndentation();
        typescriptEmitter.writeLine(
          `${name}${isNullable ? "?" : ""}: ${getFullType(
            type,
            isArray,
            arrayLevels
          )};`
        );
      }

      typescriptEmitter.ensureNewParagraph();
      typescriptEmitter.enterScope(`constructor(dto: ${entityClassName}) {`);

      if (!isBaseEntity) {
        typescriptEmitter.writeIndentation();
        typescriptEmitter.writeLine(`super(dto);`);
        typescriptEmitter.ensureNewParagraph();
      }

      for (const entityProperty of entityProperties) {
        const { name } = entityProperty;
        typescriptEmitter.writeIndentation();
        typescriptEmitter.writeLine(
          `this.${name} = ${getConstructorSuffix(entityProperty)};`
        );
        typescriptEmitter.ensureNewLine();
      }

      typescriptEmitter.leaveScope();
      typescriptEmitter.leaveScope();
    },
  },
});

console.log(emitted);
