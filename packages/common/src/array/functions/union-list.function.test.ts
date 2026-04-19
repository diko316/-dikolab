import { describe, it, expect } from 'vitest';
import { unionList } from './union-list.function';

describe('unionList()', () => {
   it(
      'should return union of two arrays ' + 'with no duplicates',
      () => {
         const a = [1, 2, 3];
         const b = [3, 4, 5];
         const result = unionList(a, b);
         expect(result).toEqual([1, 2, 3, 4, 5]);
      },
   );

   it('should modify array1 in place ' + 'when clone is false', () => {
      const a = [1, 2];
      const b = [3];
      const result = unionList(a, b);
      expect(result).toBe(a);
   });

   it('should not modify array1 when ' + 'clone is true', () => {
      const a = [1, 2];
      const b = [3];
      const result = unionList(a, b, true);
      expect(result).not.toBe(a);
      expect(a).toEqual([1, 2]);
      expect(result).toEqual([1, 2, 3]);
   });

   it('should handle arrays with all duplicates', () => {
      const a = [1, 2, 3];
      const b = [1, 2, 3];
      const result = unionList(a, b, true);
      expect(result).toEqual([1, 2, 3]);
   });

   it('should handle empty arrays', () => {
      expect(unionList([], [], true)).toEqual([]);
      expect(unionList([1, 2], [], true)).toEqual([1, 2]);
      expect(unionList([], [1, 2], true)).toEqual([1, 2]);
   });

   it('should handle duplicates within ' + 'the same array', () => {
      const a = [1, 1, 2];
      const b = [2, 3];
      const result = unionList(a, b, true);
      expect(result).toEqual([1, 2, 3]);
   });

   it('should work with string values', () => {
      const a = ['a', 'b'];
      const b = ['b', 'c'];
      const result = unionList(a, b, true);
      expect(result).toEqual(['a', 'b', 'c']);
   });

   it('should throw for non-array array1', () => {
      expect(
         // eslint-disable-next-line
            () => unionList('x' as any, []),
      ).toThrow('Invalid [array1] parameter.');
   });

   it('should throw for non-array array2', () => {
      expect(
         // eslint-disable-next-line
            () => unionList([], 'x' as any),
      ).toThrow('Invalid [array2] parameter.');
   });
});
