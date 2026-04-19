import type { AnyArray } from '../../typing/types/any-array.type';
import { isArray } from '../../type-checking/functions/is-array.function';

/**
 * Returns elements in list1 not in list2
 *
 * @param list1 - Source array
 * @param list2 - Array of elements to exclude
 * @returns Difference of the arrays
 */
export function differenceList(
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

   let total1 = array1.length;
   const total2 = array2.length;
   array1 = clone ? array1.slice(0) : array1;

   found: for (let l1 = total1; l1--; ) {
      const subject = array1[l1];

      for (let l2 = total2; l2--; ) {
         if (subject === array2[l2]) {
            array1.splice(l1, 1);
            total1--;
            continue found;
         }
      }

      for (let l2 = total1; l2--; ) {
         if (l2 !== l1 && subject === array1[l2]) {
            array1.splice(l1, 1);
            total1--;
            continue found;
         }
      }
   }

   return array1;
}
