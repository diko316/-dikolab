import { jsonEach } from './json-each.function';

function onParsePath(
   property: string,
   _last: boolean,
   context: string[],
): void {
   context[context.length] = property;
}

/**
 * Parses a JSON path string into an array
 * of property keys
 *
 * @param path - JSON path like "a.b[0].c"
 * @returns Array of path segments
 */
export function jsonParsePath(path: string): string[] | null {
   const items: string[] = [];
   return jsonEach(path, onParsePath, items) && items.length
      ? items
      : null;
}
