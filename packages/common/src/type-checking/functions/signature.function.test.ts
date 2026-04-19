import { describe, it, expect } from 'vitest';
import { signature } from './signature.function';

describe('signature()', () => {
   it('should return "[object Undefined]" ' + 'for undefined', () => {
      expect(signature(undefined)).toBe('[object Undefined]');
   });

   it('should return "[object Null]" for null', () => {
      expect(signature(null)).toBe('[object Null]');
   });

   it('should return "[object Null]" for NaN', () => {
      expect(signature(NaN)).toBe('[object Null]');
   });

   it('should return "[object Null]" ' + 'for Infinity', () => {
      expect(signature(Infinity)).toBe('[object Null]');
      expect(signature(-Infinity)).toBe('[object Null]');
   });

   it('should return "[object Number]" ' + 'for finite numbers', () => {
      expect(signature(42)).toBe('[object Number]');
      expect(signature(0)).toBe('[object Number]');
      expect(signature(-1)).toBe('[object Number]');
   });

   it('should return "[object String]" ' + 'for strings', () => {
      expect(signature('hello')).toBe('[object String]');
      expect(signature('')).toBe('[object String]');
   });

   it('should return "[object Boolean]" ' + 'for booleans', () => {
      expect(signature(true)).toBe('[object Boolean]');
      expect(signature(false)).toBe('[object Boolean]');
   });

   it('should return "[object Object]" ' + 'for plain objects', () => {
      expect(signature({})).toBe('[object Object]');
   });

   it('should return "[object Array]" ' + 'for arrays', () => {
      expect(signature([])).toBe('[object Array]');
   });

   it('should return "[object Function]" ' + 'for functions', () => {
      expect(signature(() => {})).toBe('[object Function]');
   });

   it('should return "[object Date]" ' + 'for Date instances', () => {
      expect(signature(new Date())).toBe('[object Date]');
   });

   it('should return "[object RegExp]" ' + 'for RegExp', () => {
      expect(signature(/test/)).toBe('[object RegExp]');
   });
});
