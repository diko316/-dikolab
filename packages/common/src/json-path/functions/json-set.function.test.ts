import { describe, it, expect } from 'vitest';
import { jsonSet } from './json-set.function';

describe('jsonSet()', () => {
   it('should set a top-level property', () => {
      const obj: Record<string, unknown> = {};
      expect(jsonSet('name', obj, 'test')).toBe(true);
      expect(obj.name).toBe('test');
   });

   it(
      'should set a nested property ' + 'creating intermediates',
      () => {
         const obj: Record<string, unknown> = {};
         expect(jsonSet('a.b.c', obj, 42)).toBe(true);
         // eslint-disable-next-line
         expect((obj as any).a.b).toEqual({
            c: 42,
         });
      },
   );

   it('should overwrite primitive values ' + 'by default', () => {
      const obj = { a: 1 };
      jsonSet('a', obj, 2, true);
      expect(obj.a).toBe(2);
   });

   it(
      'should merge objects when overwrite ' + 'is false or default',
      () => {
         const obj = { a: { x: 1 } };
         jsonSet('a', obj, { y: 2 });
         expect(obj.a).toEqual({ x: 1, y: 2 });
      },
   );

   it(
      'should push to arrays when both ' + 'are arrays (default)',
      () => {
         const obj = { items: [1, 2] };
         jsonSet('items', obj, [3, 4]);
         expect(obj.items).toEqual([1, 2, 3, 4]);
      },
   );

   it('should insert into array with ' + '"insert" mode', () => {
      const obj = { items: [1, 2, 3] };
      jsonSet('items[1]', obj, 99, 'insert');
      expect(obj.items).toEqual([1, 99, 2, 3]);
   });

   it('should apply/merge with "apply" mode', () => {
      const obj = { a: { x: 1 } };
      jsonSet('a', obj, { y: 2 }, 'apply');
      expect(obj.a).toEqual({ x: 1, y: 2 });
   });

   it('should push with "push" mode ' + 'on arrays', () => {
      const obj = { items: [1, 2] };
      jsonSet('items', obj, [3], 'push');
      expect(obj.items).toEqual([1, 2, 3]);
   });

   it('should unshift with "unshift" mode', () => {
      const obj = { items: [2, 3] };
      jsonSet('items', obj, [0, 1], 'unshift');
      expect(obj.items).toEqual([0, 1, 2, 3]);
   });

   it('should return false for ' + 'non-writable subjects', () => {
      expect(jsonSet('a', null, 1)).toBe(false);
      expect(jsonSet('a', 42, 1)).toBe(false);
   });

   it('should throw for non-string path', () => {
      expect(
         // eslint-disable-next-line
            () => jsonSet(123 as any, {}, 1),
      ).toThrow('Invalid [path] parameter.');
   });

   it('should set on array by index', () => {
      const arr = [10, 20, 30];
      jsonSet('[1]', arr, 99, true);
      expect(arr[1]).toBe(99);
   });
});
