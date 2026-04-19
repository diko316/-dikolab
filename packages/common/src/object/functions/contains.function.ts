import type { Any } from '../../typing/types/any.type';
import { isString } from '../../type-checking/functions/is-string.function';
import { isNumber } from '../../type-checking/functions/is-number.function';

const hasOwn = Object.prototype.hasOwnProperty;

/**
 * Checks if a property exists on an object
 *
 * @param subject - Object to inspect
 * @param name - Property name to check
 * @returns True if property exists
 */
export function contains(
   subject: Any,
   property: string | number,
): boolean {
   if (!isString(property) && !isNumber(property)) {
      throw new Error('Invalid [property] parameter.');
   }

   return hasOwn.call(subject, property);
}
