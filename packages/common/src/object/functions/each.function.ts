import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import {
   ARRAY,
   DATE,
   METHOD,
   OBJECT,
   REGEX,
} from '../../type-checking/constants/signatures.constant';
import { signature } from '../../type-checking/functions/signature.function';

const hasOwn = Object.prototype.hasOwnProperty;
const getOwnPropertyNames = Object.getOwnPropertyNames;

/** Checks if a value is a valid iteration target */
function isValidObject(target: Any): target is AnyObject {
   switch (signature(target)) {
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
         return true;
   }
   return false;
}

export { isValidObject };

/**
 * Iterates own properties of an object or
 * elements of an array-like
 *
 * @param subject - Object or array to iterate
 * @param handler - Callback receiving
 *    (value, key, subject)
 * @param scope - Optional this context
 * @returns The subject for chaining
 */
export function each(
   subject: AnyObject,
   handler: (value: Any, name: string, subject: AnyObject) => Any,
   scope?: Any,
   hasown?: boolean,
): AnyObject {
   if (!isValidObject(subject)) {
      throw new Error('Invalid [subject] parameter.');
   }

   const noChecking = hasown === false;
   const resolvedScope = scope === undefined ? null : scope;

   const names = getOwnPropertyNames(subject);

   for (let c = 0; c < names.length; c++) {
      const name = names[c];
      if (
         (noChecking || hasOwn.call(subject, name)) &&
         handler.call(resolvedScope, subject[name], name, subject) ===
            false
      ) {
         break;
      }
   }

   return subject;
}
