import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a scalar
 * (string, number, or boolean)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to
 *    string | number | boolean
 */
export declare function isScalar(subject: Any): subject is string | number | boolean;
