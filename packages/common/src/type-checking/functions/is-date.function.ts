import { DATE } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';

const toString = Object.prototype.toString;

/**
 * Tests whether a value is a Date instance
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to Date
 */
export function isDate(subject: Any): subject is Date {
   return toString.call(subject) === DATE;
}
