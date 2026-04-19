import type { Any } from '../../typing/types/any.type';
/**
 * Deep-clones a value including nested objects,
 * arrays, dates, and regexps
 *
 * @param subject - Value to clone
 * @returns Deep copy of the value
 */
export declare function clone(data: Any, deep?: boolean): Any;
