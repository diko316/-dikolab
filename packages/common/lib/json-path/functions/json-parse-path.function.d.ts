/**
 * Parses a JSON path string into an array
 * of property keys
 *
 * @param path - JSON path like "a.b[0].c"
 * @returns Array of path segments
 */
export declare function jsonParsePath(path: string): string[] | null;
