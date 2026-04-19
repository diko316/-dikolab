import type { Any } from '../../typing/types/any.type';
/**
 * Compares a value at a JSON path against
 * an expected value
 *
 * @param path - JSON path
 * @param object1 - Root object
 * @param object2 - Value to compare against
 * @returns True if values are equal
 */
export declare function jsonCompare(path: string, object1: Any, object2: Any): boolean;
