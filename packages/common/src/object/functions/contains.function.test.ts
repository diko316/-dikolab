import { describe, it, expect } from 'vitest';
import { contains } from './contains.function';

describe('contains', () => {
   it('should return true for own string property', () => {
      expect(contains({ a: 1 }, 'a')).toBe(true);
   });

   it('should return false for missing property', () => {
      expect(contains({ a: 1 }, 'b')).toBe(false);
   });

   it('should return false for inherited properties', () => {
      const obj = Object.create({ inherited: 1 });
      expect(contains(obj, 'inherited')).toBe(false);
   });

   it('should work with numeric property on arrays', () => {
      const arr = [10, 20, 30];
      expect(contains(arr, 0)).toBe(true);
      expect(contains(arr, 1)).toBe(true);
      expect(contains(arr, 5)).toBe(false);
   });

   it('should work with numeric property on objects', () => {
      const obj = { 0: 'a', 1: 'b' };
      expect(contains(obj, 0)).toBe(true);
      expect(contains(obj, 2)).toBe(false);
   });

   it('should throw for invalid property param', () => {
      expect(() => contains({}, null as never)).toThrow(
         'Invalid [property] parameter.',
      );

      expect(() => contains({}, {} as never)).toThrow(
         'Invalid [property] parameter.',
      );

      expect(() => contains({}, undefined as never)).toThrow(
         'Invalid [property] parameter.',
      );
   });

   it(
      'should return true for property with ' + 'undefined value',
      () => {
         const obj = { a: undefined };
         expect(contains(obj, 'a')).toBe(true);
      },
   );

   it('should throw for null/undefined subjects', () => {
      expect(() => contains(null, 'a')).toThrow();
      expect(() => contains(undefined, 'a')).toThrow();
   });

   it('should check type existence in ' + 'lookup objects', () => {
      const TYPE = {
         token: 0,
         terminal: 1,
         nonterminal: 2,
      };
      expect(contains(TYPE, 'token')).toBe(true);
      expect(contains(TYPE, 'terminal')).toBe(true);
      expect(contains(TYPE, 'unknown')).toBe(false);
   });

   it(
      'should guard own-property iteration ' + 'in for-in loops',
      () => {
         const proto = { inherited: true };
         const obj = Object.create(proto);
         obj.own1 = 'a';
         obj.own2 = 'b';

         const keys: string[] = [];
         for (const key in obj) {
            if (contains(obj, key)) {
               keys.push(key);
            }
         }
         expect(keys).toEqual(['own1', 'own2']);
         expect(keys).not.toContain('inherited');
      },
   );

   it('should work with non-enumerable ' + 'own properties', () => {
      const obj = {};
      Object.defineProperty(obj, 'hidden', {
         value: 42,
         enumerable: false,
      });
      expect(contains(obj, 'hidden')).toBe(true);
   });
});
