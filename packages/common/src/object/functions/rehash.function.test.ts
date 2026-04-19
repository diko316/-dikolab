import { describe, it, expect } from 'vitest';
import { rehash } from './rehash.function';

describe('rehash', () => {
   it('should map source props to target ' + 'via access', () => {
      const target = {};
      const source = { x: 1, y: 2, z: 3 };
      const access = { a: 'x', b: 'y', c: 'z' };

      const result = rehash(target, source, access);

      expect(result).toBe(target);
      expect(target).toEqual({ a: 1, b: 2, c: 3 });
   });

   it('should set undefined for missing source keys', () => {
      const target = {};
      const source = { a: 1 };
      const access = { x: 'missing' };

      rehash(target, source, access);

      expect(target).toEqual({ x: undefined });
   });

   it('should throw for invalid target', () => {
      expect(() => rehash(null as never, {}, {})).toThrow(
         'Invalid [target] parameter.',
      );
   });

   it('should throw for invalid source', () => {
      expect(() => rehash({}, null as never, {})).toThrow(
         'Invalid [source] parameter.',
      );
   });

   it('should throw for invalid access', () => {
      expect(() => rehash({}, {}, [] as never)).toThrow(
         'Invalid [access] parameter.',
      );
   });

   it('should mutate the target in-place', () => {
      const target = { existing: true };
      const source = { val: 42 };
      const access = { mapped: 'val' };

      rehash(target, source, access);

      expect(target).toEqual({ existing: true, mapped: 42 });
   });

   it('should handle empty access object', () => {
      const target = {};
      rehash(target, { a: 1 }, {});
      expect(target).toEqual({});
   });
});
