import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { isArray } from '../../type-checking/functions/is-array.function';
import { each, isValidObject } from './each.function';

const ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;

function onMaxNumericIndex(
   _value: Any,
   name: string,
   _subject: AnyObject,
): void {
   if (ARRAY_INDEX_RE.test(name)) {
      const context = this as unknown as [number];
      context[0] = Math.max(Number(name), context[0]);
   }
}

/**
 * Finds the highest numeric key in an
 * object's own properties
 *
 * @param subject - Object to scan
 * @returns Highest numeric index, or false
 */
export function maxObjectIndex(subject: Any): number | false {
   if (isArray(subject)) {
      return subject.length - 1;
   }

   if (isValidObject(subject)) {
      const context: [number] = [-1];
      each(subject, onMaxNumericIndex, context);
      return context[0];
   }

   return false;
}
