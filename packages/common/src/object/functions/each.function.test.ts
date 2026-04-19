import { describe, it, expect } from 'vitest';
import { each, isValidObject } from './each.function';

describe('isValidObject', () => {
   it('should return true for plain objects', () => {
      expect(isValidObject({})).toBe(true);
   });

   it('should return true for arrays', () => {
      expect(isValidObject([])).toBe(true);
   });

   it('should return true for regex', () => {
      expect(isValidObject(/test/)).toBe(true);
   });

   it('should return true for dates', () => {
      expect(isValidObject(new Date())).toBe(true);
   });

   it('should return true for functions', () => {
      expect(isValidObject(() => {})).toBe(true);
   });

   it('should return false for null', () => {
      expect(isValidObject(null)).toBe(false);
   });

   it('should return false for undefined', () => {
      expect(isValidObject(undefined)).toBe(false);
   });

   it('should return false for strings', () => {
      expect(isValidObject('hello')).toBe(false);
   });

   it('should return false for numbers', () => {
      expect(isValidObject(42)).toBe(false);
   });

   it('should return false for booleans', () => {
      expect(isValidObject(true)).toBe(false);
   });
});

describe('each', () => {
   it('should iterate over object own properties', () => {
      const result: string[] = [];
      const obj = { a: 1, b: 2, c: 3 };

      each(obj, (value, name) => {
         result.push(`${name}:${value}`);
      });

      expect(result).toEqual(['a:1', 'b:2', 'c:3']);
   });

   it('should return the subject', () => {
      const obj = { a: 1 };
      const result = each(obj, () => {});
      expect(result).toBe(obj);
   });

   it('should iterate over array indices', () => {
      const result: string[] = [];
      const arr = ['x', 'y', 'z'];

      each(arr, (value, name) => {
         result.push(`${name}:${value}`);
      });

      expect(result).toContain('0:x');
      expect(result).toContain('1:y');
      expect(result).toContain('2:z');
   });

   it('should stop when handler returns false', () => {
      const result: string[] = [];
      const obj = { a: 1, b: 2, c: 3 };

      each(obj, (value, name) => {
         result.push(name);
         if (name === 'b') return false;
      });

      expect(result).toEqual(['a', 'b']);
   });

   it('should bind handler to scope', () => {
      const scope = { prefix: 'val' };
      const result: string[] = [];

      each(
         { a: 1 },
         function (this: typeof scope, value) {
            result.push(`${this.prefix}:${value}`);
         },
         scope,
      );

      expect(result).toEqual(['val:1']);
   });

   it('should use null as scope when undefined', () => {
      let capturedThis: unknown;

      each({ a: 1 }, function (this: unknown) {
         capturedThis = this;
      });

      expect(capturedThis).toBeNull();
   });

   it('should throw for non-object subjects', () => {
      expect(() => each(null as never, () => {})).toThrow(
         'Invalid [subject] parameter.',
      );

      expect(() => each(undefined as never, () => {})).toThrow(
         'Invalid [subject] parameter.',
      );

      expect(() => each(42 as never, () => {})).toThrow(
         'Invalid [subject] parameter.',
      );
   });

   it('should handle empty objects', () => {
      const result: string[] = [];
      each({}, (_, name) => {
         result.push(name);
      });
      expect(result).toEqual([]);
   });

   it('should skip non-own properties by default', () => {
      const proto = { inherited: true };
      const obj = Object.create(proto);
      obj.own = true;
      const result: string[] = [];

      each(obj, (_, name) => {
         result.push(name);
      });

      expect(result).toEqual(['own']);
   });

   it(
      'should include non-own properties ' + 'when hasown is false',
      () => {
         const proto = { inherited: true };
         const obj = Object.create(proto);
         obj.own = true;
         const result: string[] = [];

         each(
            obj,
            (_, name) => {
               result.push(name);
            },
            undefined,
            false,
         );

         expect(result).toContain('own');
      },
   );
});
