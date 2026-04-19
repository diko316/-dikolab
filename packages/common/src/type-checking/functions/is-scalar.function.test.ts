import { describe, it, expect } from 'vitest';
import { isScalar } from './is-scalar.function';

describe('isScalar()', () => {
   it('should return true for strings', () => {
      expect(isScalar('hello')).toBe(true);
      expect(isScalar('')).toBe(true);
   });

   it('should return true for finite numbers', () => {
      expect(isScalar(0)).toBe(true);
      expect(isScalar(42)).toBe(true);
      expect(isScalar(-1)).toBe(true);
      expect(isScalar(3.14)).toBe(true);
   });

   it('should return true for booleans', () => {
      expect(isScalar(true)).toBe(true);
      expect(isScalar(false)).toBe(true);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isScalar(NaN)).toBe(false);
      expect(isScalar(Infinity)).toBe(false);
      expect(isScalar(-Infinity)).toBe(false);
   });

   it('should return false for null ' + 'and undefined', () => {
      expect(isScalar(null)).toBe(false);
      expect(isScalar(undefined)).toBe(false);
   });

   it('should return false for objects ' + 'and arrays', () => {
      expect(isScalar({})).toBe(false);
      expect(isScalar([])).toBe(false);
      expect(isScalar(new Date())).toBe(false);
      expect(isScalar(/test/)).toBe(false);
   });

   it('should return false for functions', () => {
      expect(isScalar(() => {})).toBe(false);
   });
});
