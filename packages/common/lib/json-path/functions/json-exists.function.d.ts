import type { Any } from '../../typing/types/any.type';
/**
 * Checks whether a value exists at a
 * JSON path
 *
 * @param subject - Root object
 * @param path - JSON path
 * @returns True if path exists
 */
export declare function jsonExists(path: string, subject: Any): boolean;
