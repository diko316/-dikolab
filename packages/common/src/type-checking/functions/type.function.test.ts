import { describe, it, expect } from 'vitest';
import { type } from './type.function';

describe('type()', () => {
   describe('scalar type check', () => {
      it('should return true for strings', () => {
         expect(type('hello', 'scalar')).toBe(true);
         expect(type('', 'scalar')).toBe(true);
      });

      it('should return true for ' + 'finite numbers', () => {
         expect(type(42, 'scalar')).toBe(true);
         expect(type(0, 'scalar')).toBe(true);
      });

      it('should return true for booleans', () => {
         expect(type(true, 'scalar')).toBe(true);
         expect(type(false, 'scalar')).toBe(true);
      });

      it('should return false for NaN ' + 'and Infinity', () => {
         expect(type(NaN, 'scalar')).toBe(false);
         expect(type(Infinity, 'scalar')).toBe(false);
      });

      it('should return false for objects', () => {
         expect(type({}, 'scalar')).toBe(false);
         expect(type(null, 'scalar')).toBe(false);
      });
   });

   describe('regexp/regex type check', () => {
      it('should return true for RegExp', () => {
         expect(type(/test/, 'regexp')).toBe(true);
         expect(type(/test/, 'regex')).toBe(true);
         expect(type(new RegExp('x'), 'regexp')).toBe(true);
      });

      it('should return false for non-RegExp', () => {
         expect(type('test', 'regexp')).toBe(false);
         expect(type({}, 'regex')).toBe(false);
      });
   });

   describe('method type check', () => {
      it('should return true for functions', () => {
         expect(type(() => {}, 'method')).toBe(true);
         expect(type(Date, 'method')).toBe(true);
      });

      it('should return false for non-functions', () => {
         expect(type({}, 'method')).toBe(false);
         expect(type(42, 'method')).toBe(false);
      });
   });

   describe('native/nativeObject type check', () => {
      it('should return true for ' + 'plain objects', () => {
         expect(type({}, 'native')).toBe(true);
         expect(type({}, 'nativeObject')).toBe(true);
      });

      it('should return false for ' + 'class instances', () => {
         class Foo {}
         expect(type(new Foo(), 'native')).toBe(false);
      });
   });

   describe('generic type name check', () => {
      it('should match by signature string', () => {
         expect(type([], 'Array')).toBe(true);
         expect(type({}, 'Object')).toBe(true);
         expect(type(42, 'Number')).toBe(true);
         expect(type('hi', 'String')).toBe(true);
         expect(type(true, 'Boolean')).toBe(true);
         expect(type(new Date(), 'Date')).toBe(true);
      });

      it('should auto-capitalize first letter', () => {
         expect(type([], 'array')).toBe(true);
         expect(type(new Date(), 'date')).toBe(true);
      });

      it('should return false for ' + 'empty type name', () => {
         expect(type({}, '')).toBe(false);
      });

      it('should return false for mismatched ' + 'type', () => {
         expect(type(42, 'String')).toBe(false);
         expect(type('hi', 'Number')).toBe(false);
      });
   });
});
