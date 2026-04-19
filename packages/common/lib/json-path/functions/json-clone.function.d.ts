import type { Any } from '../../typing/types/any.type';
/**
 * Deep-clones the value at a JSON path
 *
 * @param path - JSON path
 * @param object - Root object
 * @param deep - Whether to deep clone
 * @returns Cloned value, or undefined
 */
export declare function jsonClone(path: string, object: Any, deep?: boolean): Any;
