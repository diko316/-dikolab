import { describe, it, expect } from 'vitest';
import { maxObjectIndex } from './max-object-index.function';

describe('maxObjectIndex', () => {
   it('should return length - 1 for arrays', () => {
      expect(maxObjectIndex([1, 2, 3])).toBe(2);
      expect(maxObjectIndex([1])).toBe(0);
   });

   it('should return -1 for empty arrays', () => {
      expect(maxObjectIndex([])).toBe(-1);
   });

   it('should return max numeric key for objects', () => {
      const obj = { 0: 'a', 5: 'b', 3: 'c' };
      expect(maxObjectIndex(obj)).toBe(5);
   });

   it('should return -1 for objects with no ' + 'numeric keys', () => {
      expect(maxObjectIndex({ a: 1, b: 2 })).toBe(-1);
   });

   it('should ignore non-numeric keys', () => {
      const obj = {
         a: 1,
         0: 'x',
         b: 2,
         10: 'y',
      };
      expect(maxObjectIndex(obj)).toBe(10);
   });

   it('should handle key 0 correctly', () => {
      expect(maxObjectIndex({ 0: 'a' })).toBe(0);
   });

   it('should return false for non-objects', () => {
      expect(maxObjectIndex(null)).toBe(false);
      expect(maxObjectIndex(undefined)).toBe(false);
      expect(maxObjectIndex(42)).toBe(false);
      expect(maxObjectIndex('string')).toBe(false);
   });

   it('should handle empty objects', () => {
      expect(maxObjectIndex({})).toBe(-1);
   });

   it('should work with large numeric keys', () => {
      const obj = { 100: 'a', 999: 'b' };
      expect(maxObjectIndex(obj)).toBe(999);
   });
});
