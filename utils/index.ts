import { PathLike, mkdir, readFile, readdir, rm, stat, writeFile } from "fs";

import { join } from "path";
import { promisify } from "util";

const _readFileAsync = promisify(readFile);
const _rmAsync = promisify(rm);
const _mkdirAsync = promisify(mkdir);
const _readdirAsync = promisify(readdir);
const _writeFileAsync = promisify(writeFile);
const _statAsync = promisify(stat);

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

export function arrayUnique<T>(list: Array<T>): Array<T> {
  return Array.from(new Set(list));
}

export async function pathExistsAsync(path: PathLike) {
  try {
    return !!(await _statAsync(path));
  } catch (error) {
    return false;
  }
}

export async function removeDirAsync(path: PathLike) {
  const exists = await pathExistsAsync(path);

  if (!exists) {
    return;
  }

  await _rmAsync(path, { recursive: true });
}

export function createDirAsync(path: PathLike) {
  return _mkdirAsync(path);
}

export async function createFileAsync(
  name: string,
  path: string,
  content: string = ""
) {
  return _writeFileAsync(join(path, name), content, {
    encoding: "utf-8",
  });
}

export async function readFileAsync(path: PathLike): Promise<string> {
  return _readFileAsync(path, "utf-8");
}

export async function readDirAsync(path: PathLike) {
  const exists = await pathExistsAsync(path);
  return exists ? _readdirAsync(path, { encoding: "utf-8" }) : [];
}
