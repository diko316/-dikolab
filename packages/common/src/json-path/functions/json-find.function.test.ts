import { describe, it, expect } from 'vitest';
import { jsonFind } from './json-find.function';

describe('jsonFind()', () => {
   it('should find a top-level property', () => {
      const obj = { name: 'test' };
      expect(jsonFind('name', obj)).toBe('test');
   });

   it('should find a nested property ' + 'using dot notation', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(jsonFind('a.b.c', obj)).toBe(42);
   });

   it('should find using bracket notation', () => {
      const obj = { a: { b: 'hello' } };
      expect(jsonFind('[a][b]', obj)).toBe('hello');
   });

   it('should find array elements by index', () => {
      const obj = { items: [10, 20, 30] };
      expect(jsonFind('items[1]', obj)).toBe(20);
   });

   it('should return undefined for ' + 'non-existent path', () => {
      const obj = { a: 1 };
      expect(jsonFind('b', obj)).toBeUndefined();
      expect(jsonFind('a.b.c', obj)).toBeUndefined();
   });

   it(
      'should return undefined when ' + 'traversing a primitive',
      () => {
         const obj = { a: 'hello' };
         expect(jsonFind('a.b', obj)).toBeUndefined();
      },
   );

   it('should handle null and undefined ' + 'subjects', () => {
      expect(jsonFind('a', null)).toBeUndefined();
      expect(jsonFind('a', undefined)).toBeUndefined();
   });

   it('should find properties on arrays', () => {
      const arr = [{ name: 'first' }];
      expect(jsonFind('[0].name', arr)).toBe('first');
   });

   it('should traverse deeply nested ' + 'mixed structures', () => {
      const data = {
         users: [
            {
               name: 'Alice',
               roles: ['admin', 'user'],
            },
         ],
      };
      expect(jsonFind('users[0].name', data)).toBe('Alice');
      expect(jsonFind('users[0].roles[1]', data)).toBe('user');
   });

   it(
      'should retrieve context values ' + 'in joqx helper pattern',
      () => {
         const context = {
            data: {
               items: [
                  { id: 1, value: 'first' },
                  { id: 2, value: 'second' },
               ],
            },
         };
         expect(jsonFind('data.items[0].value', context)).toBe('first');
         expect(jsonFind('data.items[1].id', context)).toBe(2);
      },
   );

   it(
      'should return undefined for ' + 'out-of-bounds array index',
      () => {
         const obj = { list: [1, 2, 3] };
         expect(jsonFind('list[10]', obj)).toBeUndefined();
      },
   );
});
