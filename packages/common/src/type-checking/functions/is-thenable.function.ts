import {
   BOOLEAN,
   NULL,
   NUMBER,
   STRING,
   UNDEFINED,
} from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import { signature } from './signature.function';
import { isMethod } from './is-method.function';

/**
 * Tests whether a value is a thenable
 * (has .then method)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to
 *    PromiseLike
 */
export function isThenable<T = Any>(
   subject: Any,
): subject is PromiseLike<T> {
   switch (subject) {
      case undefined:
      case null:
      case true:
      case false:
         return false;
   }

   switch (signature(subject)) {
      case NUMBER:
      case STRING:
      case BOOLEAN:
      case NULL:
      case UNDEFINED:
         return false;
   }

   return 'then' in subject && isMethod(subject.then);
}
