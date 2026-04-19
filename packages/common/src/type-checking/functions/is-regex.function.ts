import { REGEX } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';

const toString = Object.prototype.toString;

/**
 * Tests whether a value is a RegExp instance
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to RegExp
 */
export function isRegex(subject: Any): subject is RegExp {
   return toString.call(subject) === REGEX;
}
