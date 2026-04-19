import { describe, it, expect } from 'vitest';
import { fillin } from './fillin.function';

describe('fillin', () => {
   it('should fill missing properties from source', () => {
      const target = { a: 1 };
      const source = { a: 99, b: 2, c: 3 };

      const result = fillin(target, source);

      expect(result).toBe(target);
      expect(target).toEqual({ a: 1, b: 2, c: 3 });
   });

   it('should not overwrite existing properties', () => {
      const target = { a: 1, b: 2 };
      const source = { a: 10, b: 20 };

      fillin(target, source);

      expect(target).toEqual({ a: 1, b: 2 });
   });

   it('should handle empty target', () => {
      const target = {};
      fillin(target, { a: 1, b: 2 });
      expect(target).toEqual({ a: 1, b: 2 });
   });

   it('should handle empty source', () => {
      const target = { a: 1 };
      fillin(target, {});
      expect(target).toEqual({ a: 1 });
   });

   it('should throw for invalid target', () => {
      expect(() => fillin(null as never, {})).toThrow(
         'Invalid [target] parameter',
      );
   });

   it('should throw for invalid source', () => {
      expect(() => fillin({}, null as never)).toThrow(
         'Invalid [subject] parameter.',
      );
   });

   it('should mutate the target in-place', () => {
      const target = { x: 1 };
      const result = fillin(target, { y: 2 });

      expect(result).toBe(target);
      expect(target).toHaveProperty('y', 2);
   });

   it('should preserve undefined-valued ' + 'own properties', () => {
      const target = { a: undefined };
      fillin(target, { a: 42 });
      expect(target.a).toBeUndefined();
   });

   it('should work with arrays as target', () => {
      const target = [10, 20];
      fillin(target, { 2: 30 });
      expect(target[2]).toBe(30);
   });
});
