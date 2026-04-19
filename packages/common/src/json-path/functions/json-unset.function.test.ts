import { describe, it, expect } from 'vitest';
import { jsonUnset } from './json-unset.function';

describe('jsonUnset()', () => {
   it('should remove a top-level property', () => {
      const obj: Record<string, unknown> = {
         a: 1,
         b: 2,
      };
      expect(jsonUnset('a', obj)).toBe(true);
      expect('a' in obj).toBe(false);
   });

   it('should remove a nested property', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(jsonUnset('a.b.c', obj)).toBe(true);
      expect('c' in obj.a.b).toBe(false);
   });

   it('should splice array elements by index', () => {
      const obj = { items: [10, 20, 30] };
      expect(jsonUnset('items[1]', obj)).toBe(true);
      expect(obj.items).toEqual([10, 30]);
   });

   it('should return false when path does ' + 'not exist', () => {
      const obj = { a: 1 };
      expect(jsonUnset('b', obj)).toBe(false);
   });

   it('should return true for ' + 'non-writable subjects', () => {
      expect(jsonUnset('a', null)).toBe(true);
      expect(jsonUnset('a', 42)).toBe(true);
   });

   it('should handle removing from ' + 'nested arrays', () => {
      const obj = { a: { list: [1, 2, 3] } };
      jsonUnset('a.list[0]', obj);
      expect(obj.a.list).toEqual([2, 3]);
   });

   it('should throw for non-string path', () => {
      expect(
         // eslint-disable-next-line
            () => jsonUnset(123 as any, {}),
      ).toThrow('Invalid [path] parameter.');
   });

   it('should return true when path ' + 'traverses a primitive', () => {
      const obj = { a: 'hello' };
      expect(jsonUnset('a.b', obj)).toBe(true);
   });

   it(
      'should remove context values in ' + 'joqx helper pattern',
      () => {
         const context = {
            data: {
               temp: 'remove-me',
               keep: 'stay',
            },
         };
         jsonUnset('data.temp', context);
         expect('temp' in context.data).toBe(false);
         expect(context.data.keep).toBe('stay');
      },
   );

   it('should handle removing deeply ' + 'nested properties', () => {
      const obj = {
         a: { b: { c: { d: 1 } } },
      };
      expect(jsonUnset('a.b.c.d', obj)).toBe(true);
      expect('d' in obj.a.b.c).toBe(false);
   });

   it('should splice from arrays ' + 'in nested structures', () => {
      const obj = {
         data: {
            items: ['a', 'b', 'c'],
         },
      };
      jsonUnset('data.items[1]', obj);
      expect(obj.data.items).toEqual(['a', 'c']);
   });
});
