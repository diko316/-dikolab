import { describe, it, expect } from 'vitest';
import { isString } from './is-string.function';

describe('isString()', () => {
   it('should return true for non-empty ' + 'string primitives', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('a')).toBe(true);
      expect(isString(' ')).toBe(true);
   });

   it('should return false for empty strings ' + 'by default', () => {
      expect(isString('')).toBe(false);
   });

   it(
      'should return true for empty strings ' +
         'when allowEmpty is true',
      () => {
         expect(isString('', true)).toBe(true);
      },
   );

   it('should return true for String objects', () => {
      // eslint-disable-next-line
         expect(isString(new String('hello')))
            .toBe(true);
      // eslint-disable-next-line
         expect(isString(new String('')))
            .toBe(false);
      // eslint-disable-next-line
         expect(isString(new String(''), true))
            .toBe(true);
   });

   it('should return false for non-string values', () => {
      expect(isString(42)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isString(NaN)).toBe(false);
      expect(isString(Infinity)).toBe(false);
   });

   it(
      'should work as parameter validator ' + 'in tokenizer pattern',
      () => {
         function validate(subject: unknown) {
            if (!isString(subject)) {
               throw new Error('Invalid string parameter');
            }
            return subject.toUpperCase();
         }
         expect(validate('hello')).toBe('HELLO');
         expect(() => validate(42)).toThrow('Invalid string parameter');
         expect(() => validate(null)).toThrow(
            'Invalid string parameter',
         );
      },
   );

   it('should detect strings for ' + 'JSON.parse routing', () => {
      const json = '{"a":1}';
      expect(isString(json)).toBe(true);
      const parsed = JSON.parse(json);
      expect(isString(parsed)).toBe(false);
   });

   it('should handle unicode and ' + 'special characters', () => {
      expect(isString('\u00e9')).toBe(true);
      expect(isString('\n\t')).toBe(true);
      expect(isString('\0')).toBe(true);
   });
});
