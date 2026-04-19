import type { Any } from '../../typing/types/any.type';
/**
 * Removes a value at a JSON path
 *
 * @param path - JSON path
 * @param subject - Root object
 * @returns The modified subject
 */
export declare function jsonUnset(path: string, subject: Any): boolean;
