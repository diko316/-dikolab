import { describe, it, expect } from 'vitest';
import { isArray } from './is-array.function';

describe('isArray()', () => {
   it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(new Array(5))).toBe(true);
   });

   it(
      'should return true for empty arrays ' +
         'when notEmpty is false (default)',
      () => {
         expect(isArray([])).toBe(true);
         expect(isArray([], false)).toBe(true);
      },
   );

   it(
      'should return false for empty arrays ' + 'when notEmpty is true',
      () => {
         expect(isArray([], true)).toBe(false);
      },
   );

   it(
      'should return true for non-empty arrays ' +
         'when notEmpty is true',
      () => {
         expect(isArray([1], true)).toBe(true);
         expect(isArray([1, 2, 3], true)).toBe(true);
      },
   );

   it('should return false for non-array values', () => {
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray(42)).toBe(false);
      expect(isArray('hello')).toBe(false);
      expect(isArray(true)).toBe(false);
      expect(isArray({})).toBe(false);
   });

   it('should return false for array-like objects', () => {
      expect(isArray({ length: 0 })).toBe(false);
      expect(isArray({ 0: 'a', length: 1 })).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isArray(NaN)).toBe(false);
      expect(isArray(Infinity)).toBe(false);
   });

   it(
      'should narrow to generic array type ' + 'with type predicate',
      () => {
         const data: unknown = [1, 2, 3];
         if (isArray<number[]>(data)) {
            expect(data[0]).toBe(1);
            expect(data.length).toBe(3);
         }
      },
   );

   it('should narrow to typed tuple', () => {
      const data: unknown = ['a', 'b'];
      if (isArray<string[]>(data)) {
         expect(data.map((s) => s.toUpperCase())).toEqual(['A', 'B']);
      }
   });
});
