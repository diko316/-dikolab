import { describe, it, expect } from 'vitest';
import { intersectList } from './intersect-list.function';

describe('intersectList()', () => {
   it('should return common elements', () => {
      const a = [1, 2, 3, 4];
      const b = [3, 4, 5, 6];
      const result = intersectList(a, b, true);
      expect(result).toEqual([3, 4]);
   });

   it('should modify array1 in place ' + 'when clone is false', () => {
      const a = [1, 2, 3];
      const b = [2, 3];
      const result = intersectList(a, b);
      expect(result).toBe(a);
   });

   it('should not modify array1 when ' + 'clone is true', () => {
      const a = [1, 2, 3];
      const b = [2, 3];
      const result = intersectList(a, b, true);
      expect(result).not.toBe(a);
      expect(a).toEqual([1, 2, 3]);
   });

   it('should return empty for no overlap', () => {
      const a = [1, 2];
      const b = [3, 4];
      expect(intersectList(a, b, true)).toEqual([]);
   });

   it('should handle empty arrays', () => {
      expect(intersectList([], [], true)).toEqual([]);
      expect(intersectList([1], [], true)).toEqual([]);
      expect(intersectList([], [1], true)).toEqual([]);
   });

   it('should remove duplicates from result', () => {
      const a = [1, 1, 2, 2];
      const b = [1, 2];
      const result = intersectList(a, b, true);
      expect(result).toEqual([1, 2]);
   });

   it('should throw for non-array array1', () => {
      expect(
         // eslint-disable-next-line
            () => intersectList('x' as any, []),
      ).toThrow('Invalid [array1] parameter.');
   });

   it('should throw for non-array array2', () => {
      expect(
         // eslint-disable-next-line
            () => intersectList([], 'x' as any),
      ).toThrow('Invalid [array2] parameter.');
   });
});
