import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { each } from './each.function';

function applyClear(
   _value: Any,
   name: string,
   subject: AnyObject,
): void {
   delete subject[name];
}

/**
 * Removes all own enumerable properties
 * from an object
 *
 * @param subject - Object to clear
 * @returns The emptied object
 */
export function clear(subject: AnyObject): AnyObject {
   each(subject, applyClear, null, true);
   return subject;
}
