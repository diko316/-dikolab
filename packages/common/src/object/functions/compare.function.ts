import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { isObject } from '../../type-checking/functions/is-object.function';
import { isArray } from '../../type-checking/functions/is-array.function';
import { isRegex } from '../../type-checking/functions/is-regex.function';
import { isDate } from '../../type-checking/functions/is-date.function';
import { each } from './each.function';

function compareLookback(
   object1: Any,
   object2: Any,
   references: Any[],
): boolean {
   const depth = references.length;

   if (object1 === object2) {
      return true;
   }

   if (isObject(object1)) {
      if (!isObject(object2)) {
         return false;
      }

      if (
         references.lastIndexOf(object1) !== -1 &&
         references.lastIndexOf(object2) !== -1
      ) {
         return true;
      }

      references[depth] = object1;
      references[depth + 1] = object2;

      const context: [AnyObject, Any[], boolean] = [
         object2,
         references,
         true,
      ];

      each(object1, onEachCompare, context);

      if (!context[2]) {
         return false;
      }

      context[0] = object1;
      each(object2, onEachCompare, context);

      if (!context[2]) {
         return false;
      }

      references.length = depth;
      return true;
   }

   if (isArray(object1)) {
      if (!isArray(object2)) {
         return false;
      }

      if (
         references.lastIndexOf(object1) !== -1 &&
         references.lastIndexOf(object2) !== -1
      ) {
         return true;
      }

      const len = object1.length;
      if (len !== object2.length) {
         return false;
      }

      references[depth] = object1;
      references[depth + 1] = object2;

      for (let i = len; i--; ) {
         if (!compareLookback(object1[i], object2[i], references)) {
            return false;
         }
      }

      references.length = depth;
      return true;
   }

   if (isRegex(object1)) {
      return isRegex(object2) && object1.source === object2.source;
   }

   if (isDate(object1)) {
      return (
         isDate(object2) && object1.toString() === object2.toString()
      );
   }

   return false;
}

function onEachCompare(
   this: [AnyObject, Any[], boolean],
   value: Any,
   name: string,
): boolean {
   const target = this[0];
   const result =
      name in target
         ? compareLookback(value, target[name], this[1])
         : false;
   this[2] = result;
   return result;
}

/**
 * Deep-compares two values for structural
 * equality
 *
 * @param subject - First value
 * @param compareTo - Second value
 * @returns True if structurally equal
 */
export function compare(object1: Any, object2: Any): boolean {
   return compareLookback(object1, object2, []);
}
