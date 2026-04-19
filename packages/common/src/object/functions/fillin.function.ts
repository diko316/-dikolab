import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { each, isValidObject } from './each.function';
import { contains } from './contains.function';

function applyFillin(this: AnyObject, value: Any, name: string): void {
   if (!contains(this, name)) {
      this[name] = value;
   }
}

/**
 * Copies properties from source to target
 * only where target lacks them
 *
 * @param target - Object to fill
 * @param source - Object providing defaults
 * @returns The modified target
 */
export function fillin(
   target: AnyObject,
   source: AnyObject,
   hasown = true,
): AnyObject {
   if (!isValidObject(target)) {
      throw new Error('Invalid [target] parameter');
   }
   each(source, applyFillin, target, hasown);
   return target;
}
