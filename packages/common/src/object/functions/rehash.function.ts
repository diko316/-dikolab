import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { isObject } from '../../type-checking/functions/is-object.function';
import { each, isValidObject } from './each.function';

/**
 * Creates a new object with remapped keys
 *
 * @param subject - Source object
 * @param handler - Key mapping callback
 * @returns New object with transformed keys
 */
export function rehash(
   target: AnyObject,
   source: AnyObject,
   access: AnyObject,
): AnyObject {
   if (!isValidObject(target)) {
      throw new Error('Invalid [target] parameter.');
   }

   if (!isValidObject(source)) {
      throw new Error('Invalid [source] parameter.');
   }

   if (!isObject(access)) {
      throw new Error('Invalid [access] parameter.');
   }

   const context: [AnyObject, AnyObject] = [target, source];

   each(
      access,
      function (this: Any, value: Any, name: string): void {
         this[0][name] = this[1][value];
      },
      context,
   );

   return target;
}
