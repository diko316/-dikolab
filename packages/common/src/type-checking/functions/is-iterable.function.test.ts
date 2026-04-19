import { describe, it, expect } from 'vitest';
import { isIterable } from './is-iterable.function';

describe('isIterable()', () => {
   it('should return true for arrays', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable([1, 2, 3])).toBe(true);
   });

   it('should return true for strings', () => {
      expect(isIterable('hello')).toBe(true);
      expect(isIterable('')).toBe(true);
   });

   it('should return true for String objects', () => {
      // eslint-disable-next-line
         expect(isIterable(new String('hello')))
            .toBe(true);
   });

   it(
      'should return true for array-like objects ' +
         'with numeric length',
      () => {
         expect(isIterable({ length: 0 })).toBe(true);
         expect(isIterable({ 0: 'a', length: 1 })).toBe(true);
      },
   );

   it(
      'should return false for objects without ' + 'a valid length',
      () => {
         expect(isIterable({})).toBe(false);
         expect(isIterable({ length: -1 })).toBe(false);
         expect(isIterable({ length: 'abc' })).toBe(false);
      },
   );

   it('should return false for null ' + 'and undefined', () => {
      expect(isIterable(null)).toBe(false);
      expect(isIterable(undefined)).toBe(false);
   });

   it('should return false for booleans', () => {
      expect(isIterable(true)).toBe(false);
      expect(isIterable(false)).toBe(false);
   });

   it('should return false for numbers', () => {
      expect(isIterable(42)).toBe(false);
      expect(isIterable(0)).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isIterable(NaN)).toBe(false);
      expect(isIterable(Infinity)).toBe(false);
      expect(isIterable(-Infinity)).toBe(false);
   });

   it('should return false for functions', () => {
      expect(isIterable(() => {})).toBe(false);
   });

   it('should narrow to typed ' + 'Iterable<T>', () => {
      const data: unknown = [1, 2, 3];
      if (isIterable<number>(data)) {
         const result: number[] = [];
         for (const item of data) {
            result.push(item);
         }
         expect(result).toEqual([1, 2, 3]);
      }
   });
});
