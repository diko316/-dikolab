import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { each, isValidObject } from './each.function';

function apply(this: AnyObject, value: Any, name: string): void {
   this[name] = value;
}

/** Copies all properties including non-enumerable */
export function assignAll(
   target: AnyObject,
   source: AnyObject,
   defaults?: AnyObject,
): AnyObject {
   if (defaults) {
      each(defaults, apply, target, false);
   }
   each(source, apply, target);
   return target;
}

/**
 * Copies own enumerable properties from
 * sources onto a target
 *
 * @param target - Object to receive properties
 * @param source - One or more source objects
 * @returns The modified target
 */
export function assign(
   target: AnyObject,
   source: AnyObject,
   defaults?: AnyObject | boolean,
   ownedOnly?: boolean,
): AnyObject {
   if (!isValidObject(target)) {
      throw new Error('Invalid [target] parameter.');
   }

   if (!isValidObject(source)) {
      throw new Error('Invalid [source] parameter.');
   }

   let resolvedOwned: boolean;

   if (typeof defaults === 'boolean') {
      resolvedOwned = defaults;
      defaults = undefined;
   } else {
      resolvedOwned = ownedOnly !== false;
   }

   if (isValidObject(defaults)) {
      each(defaults, apply, target, resolvedOwned);
   } else if (defaults !== undefined) {
      throw new Error('Invalid [defaults] parameter.');
   }

   each(source, apply, target, resolvedOwned);

   return target;
}
