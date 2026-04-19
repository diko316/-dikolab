import { describe, it, expect } from 'vitest';
import { jsonCompare } from './json-compare.function';

describe('jsonCompare()', () => {
   it('should return true when path value ' + 'matches object2', () => {
      const obj = { a: { b: 42 } };
      expect(jsonCompare('a.b', obj, 42)).toBe(true);
   });

   it('should return false when path value ' + 'does not match', () => {
      const obj = { a: { b: 42 } };
      expect(jsonCompare('a.b', obj, 99)).toBe(false);
   });

   it('should deep compare objects', () => {
      const obj = { a: { b: { x: 1, y: 2 } } };
      expect(jsonCompare('a.b', obj, { x: 1, y: 2 })).toBe(true);
      expect(jsonCompare('a.b', obj, { x: 1, y: 3 })).toBe(false);
   });

   it('should deep compare arrays', () => {
      const obj = { items: [1, 2, 3] };
      expect(jsonCompare('items', obj, [1, 2, 3])).toBe(true);
      expect(jsonCompare('items', obj, [1, 2])).toBe(false);
   });

   it('should compare strings', () => {
      const obj = { name: 'test' };
      expect(jsonCompare('name', obj, 'test')).toBe(true);
      expect(jsonCompare('name', obj, 'other')).toBe(false);
   });

   it(
      'should return false for non-existent ' +
         'path comparing to a value',
      () => {
         const obj = { a: 1 };
         expect(jsonCompare('b', obj, 1)).toBe(false);
      },
   );

   it(
      'should compare undefined for ' +
         'non-existent path with undefined',
      () => {
         const obj = { a: 1 };
         expect(jsonCompare('b', obj, undefined)).toBe(true);
      },
   );
});
