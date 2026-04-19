import type { Any } from '../../typing/types/any.type';
/**
 * Tests whether a value is a RegExp instance
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to RegExp
 */
export declare function isRegex(subject: Any): subject is RegExp;
