import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import type { AnyConstructor } from '../../typing/types/any-constructor.type';
import { isObject } from '../../type-checking/functions/is-object.function';
import { assign } from './assign.function';

/**
 * Creates an instance of a constructor with
 * pre-applied properties
 *
 * @param Class - Constructor to instantiate
 * @param properties - Properties to assign
 * @returns New instance with properties applied
 */
export function instantiate(
   Class: AnyConstructor,
   overrides?: AnyObject,
): Any {
   const instance = Object.create(Class.prototype as AnyObject);

   if (isObject(overrides)) {
      return assign(instance, overrides);
   }

   return instance;
}
