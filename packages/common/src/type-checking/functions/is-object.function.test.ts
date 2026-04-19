import { describe, it, expect } from 'vitest';
import { isObject } from './is-object.function';

describe('isObject()', () => {
   it('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
   });

   it('should return true for ' + 'Object.create(null)', () => {
      expect(isObject(Object.create(null))).toBe(true);
   });

   it(
      'should return true for objects created ' +
         'with Object constructor',
      () => {
         expect(isObject(new Object())).toBe(true);
      },
   );

   it('should return false for null ' + 'and undefined', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
   });

   it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
   });

   it('should return false for primitives', () => {
      expect(isObject(42)).toBe(false);
      expect(isObject('hello')).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
   });

   it('should return false for other ' + 'object types', () => {
      expect(isObject(new Date())).toBe(false);
      expect(isObject(/test/)).toBe(false);
      expect(isObject(() => {})).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isObject(NaN)).toBe(false);
      expect(isObject(Infinity)).toBe(false);
      expect(isObject(-Infinity)).toBe(false);
   });

   it('should return true for ' + 'JSON.parse() results', () => {
      const parsed = JSON.parse('{"a":1,"b":"hello"}');
      expect(isObject(parsed)).toBe(true);
   });

   it('should return false for ' + 'JSON.parse() arrays', () => {
      const parsed = JSON.parse('[1,2,3]');
      expect(isObject(parsed)).toBe(false);
   });

   it('should work as parser definition ' + 'validator', () => {
      function loadDefinition(json: unknown) {
         if (!isObject(json)) {
            throw new Error('Invalid Object definition.');
         }
         return json;
      }
      expect(loadDefinition({ root: 'S' })).toEqual({ root: 'S' });
      expect(() => loadDefinition(null)).toThrow(
         'Invalid Object definition.',
      );
      expect(() => loadDefinition([])).toThrow(
         'Invalid Object definition.',
      );
      expect(() => loadDefinition('str')).toThrow(
         'Invalid Object definition.',
      );
   });

   it('should return true for ' + 'frozen and sealed objects', () => {
      expect(isObject(Object.freeze({ a: 1 }))).toBe(true);
      expect(isObject(Object.seal({ b: 2 }))).toBe(true);
   });

   it('should narrow to generic type ' + 'with type predicate', () => {
      interface Config {
         debug: boolean;
         name: string;
      }
      const data: unknown = {
         debug: true,
         name: 'test',
      };
      if (isObject<Config>(data)) {
         expect(data.debug).toBe(true);
         expect(data.name).toBe('test');
      }
   });

   it('should narrow to default AnyObject ' + 'without generic', () => {
      const data: unknown = { x: 42 };
      if (isObject(data)) {
         expect(data.x).toBe(42);
      }
   });
});
