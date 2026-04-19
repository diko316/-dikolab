import { OBJECT } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { signature } from './signature.function';

const O = Object;
const hasOwn = O.prototype.hasOwnProperty;

/**
 * Tests whether a value is a native object
 * (not subclass)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to AnyObject
 */
export function isNativeObject<T extends AnyObject = AnyObject>(
   subject: Any,
): subject is T {
   if (signature(subject) !== OBJECT) {
      return false;
   }

   const constructor = subject.constructor;

   if (hasOwn.call(subject, 'constructor')) {
      delete subject.constructor;
      const result = subject.constructor === O;
      subject.constructor = constructor;
      return result;
   }

   return constructor === O;
}
