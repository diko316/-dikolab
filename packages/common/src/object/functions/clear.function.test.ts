import { describe, it, expect } from 'vitest';
import { clear } from './clear.function';

describe('clear', () => {
   it('should remove all own properties ' + 'from an object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = clear(obj);

      expect(result).toBe(obj);
      expect(Object.keys(obj)).toEqual([]);
   });

   it('should return the same object', () => {
      const obj = { x: 1 };
      expect(clear(obj)).toBe(obj);
   });

   it('should handle empty objects', () => {
      const obj = {};
      clear(obj);
      expect(Object.keys(obj)).toEqual([]);
   });

   it('should clear object properties', () => {
      const obj = { 0: 1, 1: 2, 2: 3 };
      clear(obj);
      expect(Object.keys(obj)).toEqual([]);
   });

   it('should not affect inherited properties', () => {
      const proto = { inherited: true };
      const obj = Object.create(proto);
      obj.own = true;

      clear(obj);

      expect(obj.own).toBeUndefined();
      expect(obj.inherited).toBe(true);
   });

   it('should handle objects with methods', () => {
      const obj = {
         name: 'test',
         greet() {
            return 'hi';
         },
      };

      clear(obj);
      expect(Object.keys(obj)).toEqual([]);
   });
});
