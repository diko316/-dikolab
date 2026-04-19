import { STRING } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';

const toString = Object.prototype.toString;

/**
 * Tests whether a value is a string
 *
 * @param subject - Value to test
 * @param allowEmpty - Allow empty strings
 * @returns Type predicate narrowing to string
 */
export function isString(
   subject: Any,
   allowEmpty = false,
): subject is string {
   return (
      (typeof subject === 'string' ||
         toString.call(subject) === STRING) &&
      (allowEmpty || subject.length !== 0)
   );
}
