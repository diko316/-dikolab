import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a Date instance
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to Date
 */
export declare function isDate(subject: Any): subject is Date;
