import type { AnyArray } from '../../typing/types/any-array.type';
/**
 * Merges two arrays, removing duplicates
 *
 * @param list1 - First array
 * @param list2 - Second array
 * @returns Union of both arrays
 */
export declare function unionList(array1: AnyArray, array2: AnyArray, clone?: boolean): AnyArray;
