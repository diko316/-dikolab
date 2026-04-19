import { describe, it, expect } from 'vitest';
import { jsonFill } from './json-fill.function';

describe('jsonFill()', () => {
   it('should fill a top-level property ' + 'on an object', () => {
      const obj: Record<string, unknown> = {};
      expect(jsonFill('name', obj, 'test')).toBe(true);
      expect(obj.name).toBe('test');
   });

   it(
      'should fill a nested path creating ' + 'intermediate objects',
      () => {
         const obj: Record<string, unknown> = {};
         jsonFill('a.b.c', obj, 42);
         expect(
            // eslint-disable-next-line
            (obj as any).a.b.c,
         ).toBe(42);
      },
   );

   it('should fill array indices', () => {
      const obj: Record<string, unknown> = {};
      jsonFill('items[0]', obj, 'first');
      expect(
         // eslint-disable-next-line
            (obj as any).items[0],
      ).toBe('first');
   });

   it('should auto-create arrays for ' + 'numeric keys', () => {
      const obj: Record<string, unknown> = {};
      jsonFill('list[0][1]', obj, 'val');
      expect(
         // eslint-disable-next-line
            (obj as any).list[0][1],
      ).toBe('val');
      expect(
         // eslint-disable-next-line
            Array.isArray((obj as any).list),
      ).toBe(true);
   });

   it('should return false for non-object ' + 'subjects', () => {
      expect(jsonFill('a', 42, 'v')).toBe(false);
      expect(jsonFill('a', null, 'v')).toBe(false);
      expect(jsonFill('a', 'str', 'v')).toBe(false);
   });

   it('should throw for non-string path', () => {
      expect(
         // eslint-disable-next-line
            () => jsonFill(123 as any, {}, 1),
      ).toThrow('Invalid [path] parameter.');
   });

   it('should throw for empty path', () => {
      expect(() => jsonFill('', {}, 1)).toThrow(
         'Invalid [path] parameter.',
      );
   });

   it('should fill on array subjects', () => {
      const arr: unknown[] = [];
      jsonFill('[0]', arr, 'value');
      expect(arr[0]).toBe('value');
   });

   it('should overwrite existing values', () => {
      const obj = { a: 1 };
      jsonFill('a', obj, 2);
      expect(obj.a).toBe(2);
   });

   it('should handle appending with empty ' + 'bracket index', () => {
      const obj: Record<string, unknown> = {
         items: [1, 2],
      };
      jsonFill('items[]', obj, 3);
      expect(
         // eslint-disable-next-line
            (obj as any).items[2],
      ).toBe(3);
   });

   it('should set context values in ' + 'joqx helper pattern', () => {
      const context: Record<string, unknown> = {};
      jsonFill('data.result', context, 42);
      expect(
         // eslint-disable-next-line
            (context as any).data.result,
      ).toBe(42);
   });

   it('should build nested structures ' + 'from empty object', () => {
      const obj: Record<string, unknown> = {};
      jsonFill('a.b.c.d', obj, 'deep');
      expect(
         // eslint-disable-next-line
            (obj as any).a.b.c.d,
      ).toBe('deep');
   });

   it('should handle mixed array and ' + 'object paths', () => {
      const obj: Record<string, unknown> = {};
      jsonFill('users[0].name', obj, 'Alice');
      expect(
         // eslint-disable-next-line
            (obj as any).users[0].name,
      ).toBe('Alice');
      expect(
         // eslint-disable-next-line
            Array.isArray((obj as any).users),
      ).toBe(true);
   });
});
