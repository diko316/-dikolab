import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a thenable
 * (has .then method)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to
 *    PromiseLike
 */
export declare function isThenable<T = Any>(subject: Any): subject is PromiseLike<T>;
