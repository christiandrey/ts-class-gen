import {
  CSharpProperty,
  Emitter,
  TypeEmitter,
} from "@fluffy-spoon/csharp-to-typescript-generator";
import {
  ParsedPropertyAttribute,
  ParsedPropertyType,
  ParsedPropertyWithAttributes,
  VALIDATION_ATTRIBUTES_MAP,
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

import { CSharpAttributeParameter } from "@fluffy-spoon/csharp-to-typescript-generator/node_modules/@fluffy-spoon/csharp-parser";

export type EmittedClass = {
  name: string;
  emitted: string;
  enums: Array<string>;
};

export type EmittedDto = {
  emitted: string;
  enums: Array<string>;
  entitiesImports: Array<string>;
  typingsImports: Array<string>;
};

export type EmittedValidationSchema = {
  name: string;
  emitted: string;
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

function getEntityPropertyWithAttributes(
  { name, type, attributes }: CSharpProperty,
  typeEmitter: TypeEmitter
) {
  const parsedType = typeEmitter.convertTypeToTypeScript(type);

  return {
    name: toCamelCase(name),
    type: getTypescriptClassName(extractChildType(parsedType)),
    isArray: parsedType.startsWith("Array"),
    isNullable: type.isNullable,
    isEnum: isEnum(parsedType),
    isPrimitive: isPrimitive(extractChildType(parsedType)),
    attributes: attributes.map((o) => ({
      name: o.name,
      parameters: o.parameters.map(getAttributeParameter),
    })),
  } as ParsedPropertyWithAttributes;
}

function getAttributeParameter(
  parameter: CSharpAttributeParameter
): boolean | number | string {
  const { value } = parameter;

  if (
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    return value;
  }

  return value.name;
}

function mapValidationAttributeSchemaFn(
  attribute: ParsedPropertyAttribute
): string | undefined {
  const { name, parameters } = attribute;
  return VALIDATION_ATTRIBUTES_MAP.get(name)?.(parameters[0]);
}

function mapPropertyTypeSchemaFn(
  property: ParsedPropertyWithAttributes
): string {
  const { type, isEnum, isPrimitive, isArray } = property;

  if (isEnum) {
    return `string()`;
  }

  if (isPrimitive) {
    return `${type}()`;
  }

  if (isArray) {
    return `array()`;
  }

  return `object()`;
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
        const importedTypes = arrayUnique(
          entityProperties
            .filter((o) => !o.isPrimitive && !o.isEnum)
            .map((o) => o.type)
            .concat(entityParents)
            .sort()
        );
        const enumTypes = entityProperties.filter((o) => o.isEnum);

        if (enumTypes.length) {
          typescriptEmitter.writeLine(
            `import {${arrayUnique(enumTypes.map((o) => o.type)).join(
              ", "
            )}} from '../typings';`
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

function emitDto(content: string, index = 0): EmittedDto {
  const enums: Array<string> = [];
  const entitiesImports: Array<string> = [];
  const typingsImports: Array<string> = [];
  const emitter = new Emitter(content);
  const emitted = emitter.emit({
    file: {
      onBeforeEmit: (file, typescriptEmitter) => {
        typescriptEmitter.clear();

        const typeEmitter = new TypeEmitter(typescriptEmitter);
        const entityClass = file.getAllClassesRecursively()[index];
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

          if (isEnum) {
            enums.push(type);
          }
        }

        typescriptEmitter.leaveScope();
      },
    },
  });

  return {
    emitted,
    enums,
    entitiesImports,
    typingsImports,
  };
}

function emitDtos(content: string): Array<EmittedDto> {
  const length = getClassesLength(content);
  const emitted: Array<EmittedDto> = [];

  for (let i = 0; i < length; i++) {
    emitted.push(emitDto(content, i));
  }

  return emitted;
}

function emitValidationSchema(
  content: string,
  index = 0
): EmittedValidationSchema | undefined {
  let name = "";
  const emitter = new Emitter(content);
  const emitted = emitter.emit({
    file: {
      onBeforeEmit: (file, typescriptEmitter) => {
        typescriptEmitter.clear();

        const typeEmitter = new TypeEmitter(typescriptEmitter);
        const entityClass = file.getAllClassesRecursively()[index];
        const entityClassName = (name = getTypescriptClassName(
          entityClass.name
        ));
        const entityProperties = entityClass.properties
          .map((property) =>
            getEntityPropertyWithAttributes(property, typeEmitter)
          )
          .filter((o) => !!o.attributes.length);

        if (!entityProperties.length) {
          return;
        }

        const mappedEntityProperties = entityProperties.map((o) => ({
          property: o,
          propertyTypeSchemaFn: mapPropertyTypeSchemaFn(o),
          validationAttributesSchemaFns: o.attributes.map(
            mapValidationAttributeSchemaFn
          ),
        }));

        const yupImports = arrayUnique(
          mappedEntityProperties
            .map((o) => o.propertyTypeSchemaFn.split("(")[0])
            .concat("object")
        ).sort();

        const utilsImports: Array<string> = [];

        const utilImportsCollection = mappedEntityProperties.flatMap(
          (o) => o.validationAttributesSchemaFns
        );

        if (utilImportsCollection.some((o) => o?.includes("email("))) {
          utilsImports.push("getEmailValidationMessage");
        }

        if (utilImportsCollection.some((o) => o?.includes("required("))) {
          utilsImports.push("getRequiredValidationMessage");
        }

        if (utilsImports.length) {
          typescriptEmitter.writeLine(
            `import {${utilsImports.join(", ")}} from './utils';`
          );
        }

        if (yupImports.length) {
          typescriptEmitter.writeLine(
            `import {${yupImports.join(", ")}} from 'yup';`
          );
        }

        typescriptEmitter.ensureNewParagraph();
        typescriptEmitter.writeLine(
          `const ${toCamelCase(entityClassName)} = object({`
        );
        typescriptEmitter.increaseIndentation();

        for (const mappedProperty of mappedEntityProperties) {
          const {
            property,
            propertyTypeSchemaFn,
            validationAttributesSchemaFns,
          } = mappedProperty;
          typescriptEmitter.writeLine(
            `${property.name}: ${[
              propertyTypeSchemaFn,
              ...validationAttributesSchemaFns.filter((o) => !!o),
            ].join(".")},`
          );
        }

        typescriptEmitter.decreaseIndentation();
        typescriptEmitter.writeLine(`});`);
        typescriptEmitter.ensureNewParagraph();
        typescriptEmitter.writeLine(
          `export default ${toCamelCase(entityClassName)};`
        );
      },
    },
  });

  if (emitted.length) {
    return {
      name,
      emitted,
    };
  }
}

function emitValidationSchemas(
  content: string
): Array<EmittedValidationSchema> {
  const length = getClassesLength(content);
  const emitted: Array<EmittedValidationSchema> = [];

  for (let i = 0; i < length; i++) {
    const validationSchema = emitValidationSchema(content, i);

    if (validationSchema) {
      emitted.push(validationSchema);
    }
  }

  return emitted;
}

export const parser = {
  emitClasses,
  emitDtos,
  emitEnum,
  emitValidationSchemas,
};
