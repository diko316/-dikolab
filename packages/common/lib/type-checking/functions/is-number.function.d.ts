import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a finite number
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to number
 */
export declare function isNumber(subject: Any): subject is number;
