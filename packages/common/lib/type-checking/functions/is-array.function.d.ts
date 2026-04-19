import type { Any } from '../../typing/types/any.type';
import type { AnyArray } from '../../typing/types/any-array.type';
/**
 * Tests whether a value is an array
 *
 * @param subject - Value to test
 * @param notEmpty - Require non-empty array
 * @returns Type predicate narrowing to AnyArray
 */
export declare function isArray<T extends AnyArray = AnyArray>(subject: Any, notEmpty?: boolean): subject is T;
