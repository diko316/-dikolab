import { describe, it, expect } from 'vitest';
import { jsonExists } from './json-exists.function';

describe('jsonExists()', () => {
   it('should return true for existing ' + 'top-level property', () => {
      const obj = { name: 'test' };
      expect(jsonExists('name', obj)).toBe(true);
   });

   it('should return true for nested ' + 'existing property', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(jsonExists('a.b.c', obj)).toBe(true);
   });

   it(
      'should return false for non-existent ' + 'top-level property',
      () => {
         const obj = { a: 1 };
         expect(jsonExists('b', obj)).toBe(false);
      },
   );

   it(
      'should return false for non-existent ' + 'nested property',
      () => {
         const obj = { a: { b: 1 } };
         expect(jsonExists('a.c', obj)).toBe(false);
         expect(jsonExists('a.b.c', obj)).toBe(false);
      },
   );

   it('should return true for array indices', () => {
      const obj = { items: [10, 20, 30] };
      expect(jsonExists('items[0]', obj)).toBe(true);
      expect(jsonExists('items[2]', obj)).toBe(true);
   });

   it('should return false for out-of-range ' + 'array index', () => {
      const obj = { items: [10] };
      expect(jsonExists('items[5]', obj)).toBe(false);
   });

   it('should return false for null subject', () => {
      expect(jsonExists('a', null)).toBe(false);
   });

   it('should return false for undefined ' + 'subject', () => {
      expect(jsonExists('a', undefined)).toBe(false);
   });

   it(
      'should return true for properties ' + 'with falsy values',
      () => {
         const obj = { a: 0, b: false, c: '' };
         expect(jsonExists('a', obj)).toBe(true);
         expect(jsonExists('b', obj)).toBe(true);
         expect(jsonExists('c', obj)).toBe(true);
      },
   );

   it('should handle bracket notation', () => {
      const obj = { a: { b: 1 } };
      expect(jsonExists('[a][b]', obj)).toBe(true);
      expect(jsonExists('[a][c]', obj)).toBe(false);
   });

   it('should check deeply nested ' + 'mixed structures', () => {
      const data = {
         users: [{ name: 'Alice', active: true }],
      };
      expect(jsonExists('users[0].name', data)).toBe(true);
      expect(jsonExists('users[0].email', data)).toBe(false);
      expect(jsonExists('users[1]', data)).toBe(false);
   });

   it(
      'should work with parser state ' + 'map validation pattern',
      () => {
         const definition = {
            root: 'S',
            states: { s0: {}, s1: {} },
            ends: { s1: true },
            reducers: {},
            symbol: {},
            exclude: ['ws'],
         };
         expect(jsonExists('root', definition)).toBe(true);
         expect(jsonExists('states', definition)).toBe(true);
         expect(jsonExists('tokens', definition)).toBe(false);
      },
   );
});
