import { describe, it, expect } from 'vitest';
import { isDate } from './is-date.function';

describe('isDate()', () => {
   it('should return true for Date instances', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2024-01-01'))).toBe(true);
      expect(isDate(new Date(0))).toBe(true);
   });

   it('should return true for invalid Date ' + 'instances', () => {
      expect(isDate(new Date('invalid'))).toBe(true);
   });

   it('should return false for non-Date values', () => {
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
      expect(isDate(42)).toBe(false);
      expect(isDate('2024-01-01')).toBe(false);
      expect(isDate(Date.now())).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
      expect(isDate(true)).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isDate(NaN)).toBe(false);
      expect(isDate(Infinity)).toBe(false);
   });
});
