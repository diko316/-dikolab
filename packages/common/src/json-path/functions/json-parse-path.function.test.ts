import { describe, it, expect } from 'vitest';
import { jsonParsePath } from './json-parse-path.function';

describe('jsonParsePath()', () => {
   it('should parse dot-separated paths', () => {
      expect(jsonParsePath('a.b.c')).toEqual(['a', 'b', 'c']);
   });

   it('should parse bracket notation paths', () => {
      expect(jsonParsePath('[a][b][c]')).toEqual(['a', 'b', 'c']);
   });

   it('should parse mixed dot and bracket', () => {
      expect(jsonParsePath('a[b].c')).toEqual(['a', 'b', 'c']);
   });

   it('should parse quoted bracket notation', () => {
      expect(jsonParsePath("['a']['b']")).toEqual(['a', 'b']);
      expect(jsonParsePath('["a"]["b"]')).toEqual(['a', 'b']);
   });

   it('should parse single property', () => {
      expect(jsonParsePath('name')).toEqual(['name']);
   });

   it('should parse numeric indices', () => {
      expect(jsonParsePath('items[0]')).toEqual(['items', '0']);
   });

   it('should throw for empty path', () => {
      expect(() => jsonParsePath('')).toThrow(
         'Invalid [path] parameter.',
      );
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => jsonParsePath(123 as any),
      ).toThrow();
   });

   it('should parse paths used by ' + 'joqx context helper', () => {
      expect(jsonParsePath('data.result')).toEqual(['data', 'result']);
      expect(jsonParsePath('users[0].name')).toEqual([
         'users',
         '0',
         'name',
      ]);
   });

   it('should parse deeply nested ' + 'mixed paths', () => {
      expect(jsonParsePath('a.b[0].c[1].d')).toEqual([
         'a',
         'b',
         '0',
         'c',
         '1',
         'd',
      ]);
   });

   it('should parse consecutive ' + 'bracket indices', () => {
      expect(jsonParsePath('list[0][1]')).toEqual(['list', '0', '1']);
   });
});
