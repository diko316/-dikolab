import { describe, it, expect } from 'vitest';
import { compare } from './compare.function';

describe('compare', () => {
   describe('primitives', () => {
      it('should return true for identical', () => {
         expect(compare(1, 1)).toBe(true);
         expect(compare('a', 'a')).toBe(true);
         expect(compare(true, true)).toBe(true);
         expect(compare(null, null)).toBe(true);
      });

      it('should return false for different', () => {
         expect(compare(1, 2)).toBe(false);
         expect(compare('a', 'b')).toBe(false);
         expect(compare(true, false)).toBe(false);
         expect(compare(null, undefined)).toBe(false);
      });
   });

   describe('objects', () => {
      it('should compare equal objects', () => {
         expect(compare({ a: 1 }, { a: 1 })).toBe(true);
      });

      it('should return false for different ' + 'objects', () => {
         expect(compare({ a: 1 }, { a: 2 })).toBe(false);
      });

      it('should return false when keys differ', () => {
         expect(compare({ a: 1 }, { b: 1 })).toBe(false);
      });

      it('should return false for extra keys', () => {
         expect(compare({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      });

      it('should compare nested objects', () => {
         expect(compare({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);

         expect(compare({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
      });

      it('should handle circular references', () => {
         const a: Record<string, unknown> = {};
         a.self = a;
         const b: Record<string, unknown> = {};
         b.self = b;

         expect(compare(a, b)).toBe(true);
      });
   });

   describe('arrays', () => {
      it('should compare equal arrays', () => {
         expect(compare([1, 2, 3], [1, 2, 3])).toBe(true);
      });

      it('should return false for different ' + 'lengths', () => {
         expect(compare([1, 2], [1, 2, 3])).toBe(false);
      });

      it('should return false for different ' + 'elements', () => {
         expect(compare([1, 2], [1, 3])).toBe(false);
      });

      it('should compare nested arrays', () => {
         expect(compare([[1, 2]], [[1, 2]])).toBe(true);

         expect(compare([[1, 2]], [[1, 3]])).toBe(false);
      });

      it('should not match array with object', () => {
         expect(compare([1], { 0: 1 })).toBe(false);
      });
   });

   describe('regex', () => {
      it('should compare equal regex', () => {
         expect(compare(/test/, /test/)).toBe(true);
      });

      it('should return false for different ' + 'regex', () => {
         expect(compare(/test/, /other/)).toBe(false);
      });

      it('should not match regex with non-regex', () => {
         expect(compare(/test/, 'test')).toBe(false);
      });
   });

   describe('dates', () => {
      it('should compare equal dates', () => {
         const d1 = new Date(2024, 0, 1);
         const d2 = new Date(2024, 0, 1);
         expect(compare(d1, d2)).toBe(true);
      });

      it('should return false for different dates', () => {
         const d1 = new Date(2024, 0, 1);
         const d2 = new Date(2024, 0, 2);
         expect(compare(d1, d2)).toBe(false);
      });

      it('should not match date with non-date', () => {
         expect(compare(new Date(), 'date')).toBe(false);
      });
   });

   describe('mixed types', () => {
      it('should return false for object vs array', () => {
         expect(compare({}, [])).toBe(false);
      });

      it('should return false for object ' + 'vs primitive', () => {
         expect(compare({}, 1)).toBe(false);
      });
   });
});
