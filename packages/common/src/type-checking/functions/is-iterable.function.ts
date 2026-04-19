import {
   ARRAY,
   BOOLEAN,
   METHOD,
   NUMBER,
   STRING,
} from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import { signature } from './signature.function';
import { isNumber } from './is-number.function';

/**
 * Tests whether a value is an iterable
 * (has Symbol.iterator)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to Iterable
 */
export function isIterable<T = Any>(
   subject: Any,
): subject is Iterable<T> {
   switch (subject) {
      case undefined:
      case null:
      case true:
      case false:
         return false;
   }

   if (typeof subject === 'number' && !isFinite(subject)) {
      return false;
   }

   switch (signature(subject)) {
      case NUMBER:
      case BOOLEAN:
      case METHOD:
         return false;
      case STRING:
      case ARRAY:
         return true;
   }

   return (
      'length' in subject &&
      isNumber(subject.length) &&
      subject.length > -1
   );
}
