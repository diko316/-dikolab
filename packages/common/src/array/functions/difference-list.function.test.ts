import { describe, it, expect } from 'vitest';
import { differenceList } from './difference-list.function';

describe('differenceList()', () => {
   it('should return elements in array1 ' + 'not in array2', () => {
      const a = [1, 2, 3, 4];
      const b = [3, 4, 5];
      const result = differenceList(a, b, true);
      expect(result).toEqual([1, 2]);
   });

   it('should modify array1 in place ' + 'when clone is false', () => {
      const a = [1, 2, 3];
      const b = [2];
      const result = differenceList(a, b);
      expect(result).toBe(a);
   });

   it('should not modify array1 when ' + 'clone is true', () => {
      const a = [1, 2, 3];
      const b = [2];
      const result = differenceList(a, b, true);
      expect(result).not.toBe(a);
      expect(a).toEqual([1, 2, 3]);
   });

   it(
      'should return empty when all elements ' + 'are in array2',
      () => {
         const a = [1, 2, 3];
         const b = [1, 2, 3, 4];
         expect(differenceList(a, b, true)).toEqual([]);
      },
   );

   it('should handle empty arrays', () => {
      expect(differenceList([], [], true)).toEqual([]);
      expect(differenceList([1, 2], [], true)).toEqual([1, 2]);
      expect(differenceList([], [1, 2], true)).toEqual([]);
   });

   it('should remove duplicates from result', () => {
      const a = [1, 1, 2, 3];
      const b = [3];
      const result = differenceList(a, b, true);
      expect(result).toEqual([1, 2]);
   });

   it('should throw for non-array array1', () => {
      expect(() =>
         differenceList(
            // eslint-disable-next-line
               'x' as any, [],
            [],
         ),
      ).toThrow('Invalid [array1] parameter.');
   });

   it('should throw for non-array array2', () => {
      expect(() =>
         differenceList(
            // eslint-disable-next-line
               [], 'x' as any,
         ),
      ).toThrow('Invalid [array2] parameter.');
   });
});
