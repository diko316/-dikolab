import { describe, it, expect } from 'vitest';
import { isMethod } from './is-method.function';

describe('isMethod()', () => {
   it('should return true for functions', () => {
      expect(isMethod(() => {})).toBe(true);
      expect(isMethod(function () {})).toBe(true);
      expect(isMethod(Math.max)).toBe(true);
   });

   it('should return true for class constructors', () => {
      expect(isMethod(class {})).toBe(true);
      expect(isMethod(Date)).toBe(true);
      expect(isMethod(Object)).toBe(true);
   });

   it('should return false for non-function values', () => {
      expect(isMethod(null)).toBe(false);
      expect(isMethod(undefined)).toBe(false);
      expect(isMethod(42)).toBe(false);
      expect(isMethod('hello')).toBe(false);
      expect(isMethod(true)).toBe(false);
      expect(isMethod({})).toBe(false);
      expect(isMethod([])).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isMethod(NaN)).toBe(false);
      expect(isMethod(Infinity)).toBe(false);
   });

   it('should return true for bound functions', () => {
      function greet() {
         return 'hi';
      }
      expect(isMethod(greet.bind(null))).toBe(true);
   });

   it('should return false for ' + 'async functions', () => {
      expect(isMethod(async () => {})).toBe(false);
      expect(isMethod(async function () {})).toBe(false);
   });

   it('should return false for ' + 'generator functions', () => {
      expect(isMethod(function* () {})).toBe(false);
   });

   it(
      'should validate class constructors ' + 'for registry patterns',
      () => {
         class Base {}
         class Child extends Base {}
         expect(isMethod(Child)).toBe(true);
         expect(
            isMethod(Child) && Child.prototype instanceof Base,
         ).toBe(true);
      },
   );

   it('should narrow to specific ' + 'function signature', () => {
      type Greeter = (name: string) => string;
      const data: unknown = (n: string) => `Hi ${n}`;
      if (isMethod<Greeter>(data)) {
         expect(data('World')).toBe('Hi World');
      }
   });
});
