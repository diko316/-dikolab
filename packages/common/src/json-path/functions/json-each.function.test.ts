import { describe, it, expect } from 'vitest';
import { jsonEach } from './json-each.function';

describe('jsonEach()', () => {
   it('should iterate over dot-separated ' + 'path segments', () => {
      const items: string[] = [];
      jsonEach('a.b.c', (item) => {
         items.push(item);
      });
      expect(items).toEqual(['a', 'b', 'c']);
   });

   it('should iterate over bracket notation', () => {
      const items: string[] = [];
      jsonEach('[a][b]', (item) => {
         items.push(item);
      });
      expect(items).toEqual(['a', 'b']);
   });

   it('should mark the last item correctly', () => {
      const lastFlags: boolean[] = [];
      jsonEach('a.b.c', (_item, last) => {
         lastFlags.push(last);
      });
      expect(lastFlags).toEqual([false, false, true]);
   });

   it('should stop iteration when callback ' + 'returns false', () => {
      const items: string[] = [];
      const result = jsonEach('a.b.c', (item) => {
         items.push(item);
         if (item === 'b') {
            return false;
         }
      });
      expect(items).toEqual(['a', 'b']);
      expect(result).toBe(true);
   });

   it('should pass extra arguments to callback', () => {
      const ctx = { count: 0 };
      jsonEach(
         'a.b',
         (_item, _last, arg) => {
            arg.count++;
         },
         ctx,
      );
      expect(ctx.count).toBe(2);
   });

   it('should throw for non-string path', () => {
      expect(() =>
         jsonEach(
            // eslint-disable-next-line
               123 as any,
            () => {},
         ),
      ).toThrow('Invalid [path] parameter.');
   });

   it('should throw for non-function callback', () => {
      expect(() =>
         jsonEach(
            'a.b',
            // eslint-disable-next-line
               'notfn' as any,
         ),
      ).toThrow('Invalid [callback] parameter');
   });

   it('should handle single-segment paths', () => {
      const items: string[] = [];
      jsonEach('name', (item) => {
         items.push(item);
      });
      expect(items).toEqual(['name']);
   });

   it('should handle quoted bracket keys', () => {
      const items: string[] = [];
      jsonEach("['a.b']", (item) => {
         items.push(item);
      });
      expect(items).toEqual(['a.b']);
   });

   it('should handle mixed notation', () => {
      const items: string[] = [];
      jsonEach('a[0].b', (item) => {
         items.push(item);
      });
      expect(items).toEqual(['a', '0', 'b']);
   });
});
