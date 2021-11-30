export type ParsedPropertyType = {
  name: string;
  type: string;
  arrayLevels?: number;
  isArray: boolean;
  isEnum: boolean;
  isPrimitive: boolean;
  isNullable: boolean;
};

export function getTypescriptClassName(className: string): string {
  return className.replace("Dto", "");
}

export function toCamelCase(text: string) {
  return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) {
      return "";
    }
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function isPrimitive(type: string): boolean {
  const primitives = ["boolean", "number", "string"];
  return primitives.includes(type);
}

export function isEnum(type: string): boolean {
  const childType = extractChildType(type);

  if (isPrimitive(childType)) {
    return false;
  }

  return !childType.endsWith("Dto");
}

export function extractChildType(type: string): string {
  if (!type.includes("Array")) {
    return type;
  }

  const matched = type.match(/<(.*)>/)?.[1] ?? type;

  return matched.includes("Array") ? extractChildType(matched) : matched;
}

export function toKebabCase(text: string): string {
  return (
    text
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.join("-")
      .toLowerCase() ?? text
  );
}

export function getFullType(
  type: string,
  isArray: boolean,
  arrayLevels: number = 0
) {
  if (!isArray) {
    return type;
  }

  const dummyArray = new Array(arrayLevels).fill(null);

  return dummyArray
    .map((_) => `Array<`)
    .concat(type)
    .concat(dummyArray.map((o) => `>`))
    .join("");
}

export function getConstructorSuffix({
  name,
  type,
  isArray,
  isEnum,
  isNullable,
  isPrimitive,
}: ParsedPropertyType): string {
  if (isPrimitive) {
    return `dto.${name}`;
  }

  if (isEnum) {
    return isArray ? `dto.${name} ?? []` : `dto.${name}`;
  }

  if (!isArray) {
    const creator = `new ${type}(dto.${name})`;
    return isNullable ? `dto.${name} ? ${creator}: undefined` : creator;
  }

  return `dto.${name}?.map((o) => new ${type}(o)) ?? []`;
}
