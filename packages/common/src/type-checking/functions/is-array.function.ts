import { ARRAY } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import type { AnyArray } from '../../typing/types/any-array.type';

const toString = Object.prototype.toString;

/**
 * Tests whether a value is an array
 *
 * @param subject - Value to test
 * @param notEmpty - Require non-empty array
 * @returns Type predicate narrowing to AnyArray
 */
export function isArray<T extends AnyArray = AnyArray>(
   subject: Any,
   notEmpty = false,
): subject is T {
   return (
      toString.call(subject) === ARRAY &&
      (!notEmpty || subject.length !== 0)
   );
}
