import { describe, it, expect } from 'vitest';
import { jsonClone } from './json-clone.function';

describe('jsonClone()', () => {
   it('should clone a found object shallowly', () => {
      const inner = { x: 1, y: 2 };
      const obj = { a: inner };
      const result = jsonClone('a', obj);
      expect(result).toEqual({ x: 1, y: 2 });
      expect(result).not.toBe(inner);
   });

   it('should shallow clone an array', () => {
      const arr = [1, 2, 3];
      const obj = { items: arr };
      const result = jsonClone('items', obj);
      expect(result).toEqual([1, 2, 3]);
      expect(result).not.toBe(arr);
   });

   it('should deep clone when deep is true', () => {
      const nested = { c: { d: 1 } };
      const obj = { a: { b: nested } };
      const result = jsonClone('a.b', obj, true);
      expect(result).toEqual(nested);
      expect(result).not.toBe(nested);
      expect(result.c).not.toBe(nested.c);
   });

   it('should return primitive values as-is', () => {
      const obj = { a: 42 };
      expect(jsonClone('a', obj)).toBe(42);
   });

   it('should return undefined for ' + 'non-existent path', () => {
      const obj = { a: 1 };
      expect(jsonClone('b', obj)).toBeUndefined();
   });

   it('should clone a nested array deeply', () => {
      const inner = [{ x: 1 }];
      const obj = { a: inner };
      const result = jsonClone('a', obj, true);
      expect(result).toEqual(inner);
      expect(result[0]).not.toBe(inner[0]);
   });
});
