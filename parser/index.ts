import {
  CSharpProperty,
  Emitter,
  TypeEmitter,
} from "@fluffy-spoon/csharp-to-typescript-generator";
import {
  ParsedPropertyType,
  arrayUnique,
  extractChildType,
  getConstructorSuffix,
  getFullType,
  getTypescriptClassName,
  isEnum,
  isPrimitive,
  toCamelCase,
  toKebabCase,
} from "../utils";

export type EmittedClass = {
  name: string;
  emitted: string;
  enums: Array<string>;
};

export type EmittedDto = {
  emitted: string;
  entitiesImports: Array<string>;
  typingsImports: Array<string>;
};

function getClassesLength(content: string): number {
  return content.match(/(public|private)\sclass/gim)?.length ?? 0;
}

function getEntityProperty(
  { name, type }: CSharpProperty,
  typeEmitter: TypeEmitter
) {
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
}

function emitClass(content: string, index = 0): EmittedClass {
  let name = "";
  const enums: Array<string> = [];
  const emitter = new Emitter(content);
  const emitted = emitter.emit({
    file: {
      onBeforeEmit: (file, typescriptEmitter) => {
        typescriptEmitter.clear();

        const typeEmitter = new TypeEmitter(typescriptEmitter);
        const entityClass = file.getAllClassesRecursively()[index];
        const entityInherits = !!entityClass.inheritsFrom.length;
        const entityParents = entityClass.inheritsFrom.map((o) =>
          getTypescriptClassName(o.name)
        );
        const entityClassName = (name = getTypescriptClassName(
          entityClass.name
        ));
        const entityProperties = entityClass.properties.map((property) =>
          getEntityProperty(property, typeEmitter)
        );
        const importedTypes = entityProperties
          .filter((o) => !o.isPrimitive && !o.isEnum)
          .map((o) => o.type)
          .concat(entityParents)
          .sort();
        const enumTypes = entityProperties.filter((o) => o.isEnum);

        if (enumTypes.length) {
          typescriptEmitter.writeLine(
            `import {${enumTypes
              .map((o) => o.type)
              .join(", ")}} from '../typings';`
          );
        }

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
          const { type, name, isNullable, isArray, isEnum, arrayLevels } =
            entityProperty;
          typescriptEmitter.writeIndentation();
          typescriptEmitter.writeLine(
            `${name}${isNullable ? "?" : ""}: ${getFullType(
              type,
              isArray,
              arrayLevels
            )};`
          );

          if (isEnum) {
            enums.push(type);
          }
        }

        typescriptEmitter.ensureNewParagraph();
        typescriptEmitter.enterScope(`constructor(dto: ${entityClassName}) {`);

        if (entityInherits) {
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

  return {
    name,
    emitted,
    enums: arrayUnique(enums),
  };
}

function emitClasses(content: string): Array<EmittedClass> {
  const length = getClassesLength(content);
  const emitted: Array<EmittedClass> = [];

  for (let i = 0; i < length; i++) {
    emitted.push(emitClass(content, i));
  }

  return emitted;
}

function emitEnum(content: string) {
  const emitter = new Emitter(content);
  return emitter.emit({
    defaults: {
      namespaceEmitOptions: {
        skip: true,
      },
      enumEmitOptions: {
        declare: false,
        strategy: "string-union",
      },
    },
  });
}

function emitDto(content: string): EmittedDto {
  const entitiesImports: Array<string> = [];
  const typingsImports: Array<string> = [];
  const emitter = new Emitter(content);
  const emitted = emitter.emit({
    file: {
      onBeforeEmit: (file, typescriptEmitter) => {
        typescriptEmitter.clear();

        const typeEmitter = new TypeEmitter(typescriptEmitter);
        const entityClass = file.getAllClassesRecursively()[0];
        const entityClassName = getTypescriptClassName(entityClass.name);
        const entityProperties = entityClass.properties.map((property) =>
          getEntityProperty(property, typeEmitter)
        );
        const importedTypes = entityProperties
          .filter((o) => !o.isPrimitive && !o.isEnum)
          .map((o) => o.type)
          .sort();
        const enumTypes = entityProperties
          .filter((o) => o.isEnum)
          .map((o) => o.type);

        entitiesImports.push(...importedTypes);
        typingsImports.push(...enumTypes);

        typescriptEmitter.enterScope(`export type ${entityClassName} = {`);

        for (const entityProperty of entityProperties) {
          const { type, name, isNullable, isArray, isEnum, arrayLevels } =
            entityProperty;
          typescriptEmitter.writeIndentation();
          typescriptEmitter.writeLine(
            `${name}${isNullable ? "?" : ""}: ${getFullType(
              type,
              isArray,
              arrayLevels
            )};`
          );
        }

        typescriptEmitter.leaveScope();
      },
    },
  });

  return {
    emitted,
    entitiesImports,
    typingsImports,
  };
}

export const parser = {
  emitClasses,
  emitDto,
  emitEnum,
};
