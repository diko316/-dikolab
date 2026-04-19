import { describe, it, expect } from 'vitest';
import { uncamelize } from './uncamelize.function';

describe('uncamelize()', () => {
   it('should convert camelCase to ' + 'hyphenated lowercase', () => {
      expect(uncamelize('myName')).toBe('my-name');
      expect(uncamelize('fooBarBaz')).toBe('foo-bar-baz');
   });

   it('should handle strings starting ' + 'with uppercase', () => {
      expect(uncamelize('MyName')).toBe('-my-name');
   });

   it('should return lowercase strings ' + 'unchanged', () => {
      expect(uncamelize('hello')).toBe('hello');
   });

   it('should handle single character strings', () => {
      expect(uncamelize('a')).toBe('a');
      expect(uncamelize('A')).toBe('-a');
   });

   it('should handle empty strings', () => {
      expect(uncamelize('')).toBe('');
   });

   it('should handle consecutive uppercase ' + 'letters', () => {
      expect(uncamelize('myHTML')).toBe('my-h-t-m-l');
   });

   it(
      'should handle strings already containing ' +
         'hyphens before uppercase',
      () => {
         expect(uncamelize('my-Name')).toBe('my-name');
      },
   );
});
