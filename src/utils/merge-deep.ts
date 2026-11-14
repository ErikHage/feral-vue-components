type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Merges `source` into a copy of `target`. Plain objects merge key by key; anything else,
 * arrays included, is replaced by the source's value. Neither argument is changed.
 */
export function mergeDeep<T extends object>(target: T, source: object): T {
  const result: PlainObject = { ...(target as PlainObject) };
  for (const [key, value] of Object.entries(source)) {
    const existing = result[key];
    result[key] =
      isPlainObject(existing) && isPlainObject(value) ? mergeDeep(existing, value) : value;
  }
  return result as T;
}
