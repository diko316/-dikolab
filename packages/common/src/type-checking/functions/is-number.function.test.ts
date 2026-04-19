import { describe, it, expect } from 'vitest';
import { isNumber } from './is-number.function';

describe('isNumber()', () => {
   it('should return true for finite numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
      expect(isNumber(-0)).toBe(true);
      expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
   });

   it('should return false for NaN', () => {
      expect(isNumber(NaN)).toBe(false);
   });

   it('should return false for Infinity', () => {
      expect(isNumber(Infinity)).toBe(false);
      expect(isNumber(-Infinity)).toBe(false);
   });

   it('should return false for non-number types', () => {
      expect(isNumber('42')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
   });

   it('should return false for Number objects', () => {
      // eslint-disable-next-line
         expect(isNumber(new Number(42)))
            .toBe(false);
   });
});
