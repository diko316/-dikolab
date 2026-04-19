import { describe, it, expect } from 'vitest';
import { isRegex } from './is-regex.function';

describe('isRegex()', () => {
   it('should return true for RegExp literals', () => {
      expect(isRegex(/test/)).toBe(true);
      expect(isRegex(/test/gi)).toBe(true);
      expect(isRegex(/^$/)).toBe(true);
   });

   it('should return true for RegExp instances', () => {
      expect(isRegex(new RegExp('test'))).toBe(true);
      expect(isRegex(new RegExp('test', 'i'))).toBe(true);
   });

   it('should return false for non-RegExp values', () => {
      expect(isRegex(null)).toBe(false);
      expect(isRegex(undefined)).toBe(false);
      expect(isRegex(42)).toBe(false);
      expect(isRegex('/test/')).toBe(false);
      expect(isRegex(true)).toBe(false);
      expect(isRegex({})).toBe(false);
      expect(isRegex([])).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isRegex(NaN)).toBe(false);
      expect(isRegex(Infinity)).toBe(false);
   });
});
