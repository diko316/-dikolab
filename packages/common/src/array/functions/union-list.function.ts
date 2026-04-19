import type { AnyArray } from '../../typing/types/any-array.type';
import { isArray } from '../../type-checking/functions/is-array.function';

/**
 * Merges two arrays, removing duplicates
 *
 * @param list1 - First array
 * @param list2 - Second array
 * @returns Union of both arrays
 */
export function unionList(
   array1: AnyArray,
   array2: AnyArray,
   clone = false,
): AnyArray {
   if (!isArray(array1)) {
      throw new Error('Invalid [array1] parameter.');
   }

   if (!isArray(array2)) {
      throw new Error('Invalid [array2] parameter.');
   }

   array1 = clone ? array1.slice(0) : array1;
   array1.push(...array2);
   let total = array1.length;

   found: for (let l = total; l--; ) {
      const subject = array1[l];
      for (let len = total; len--; ) {
         if (l !== len && subject === array1[len]) {
            total--;
            array1.splice(l, 1);
            continue found;
         }
      }
   }

   return array1;
}
