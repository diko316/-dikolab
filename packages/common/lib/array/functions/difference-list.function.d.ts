import type { AnyArray } from '../../typing/types/any-array.type';
/**
 * Returns elements in list1 not in list2
 *
 * @param list1 - Source array
 * @param list2 - Array of elements to exclude
 * @returns Difference of the arrays
 */
export declare function differenceList(array1: AnyArray, array2: AnyArray, clone?: boolean): AnyArray;
