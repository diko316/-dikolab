import type { Any } from '../../typing/types/any.type';
/**
 * Sets a value at a JSON path only if
 * the path does not already exist
 *
 * @param path - JSON path
 * @param subject - Root object
 * @param value - Default value to set
 * @returns The modified subject
 */
export declare function jsonFill(path: string, subject: Any, value: Any): boolean;
