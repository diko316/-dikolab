import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is an iterable
 * (has Symbol.iterator)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to Iterable
 */
export declare function isIterable<T = Any>(subject: Any): subject is Iterable<T>;
