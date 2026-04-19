import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a string
 *
 * @param subject - Value to test
 * @param allowEmpty - Allow empty strings
 * @returns Type predicate narrowing to string
 */
export declare function isString(subject: Any, allowEmpty?: boolean): subject is string;
