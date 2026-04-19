import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
/**
 * Tests whether a value is a plain object
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to AnyObject
 */
export declare function isObject<T extends AnyObject = AnyObject>(subject: Any): subject is T;
