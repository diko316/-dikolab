import { describe, it, expect } from 'vitest';
import { camelize } from './camelize.function';

describe('camelize()', () => {
   it('should convert hyphenated strings ' + 'to camelCase', () => {
      expect(camelize('my-name')).toBe('myName');
      expect(camelize('foo-bar-baz')).toBe('fooBarBaz');
   });

   it(
      'should convert underscore-separated ' + 'strings to camelCase',
      () => {
         expect(camelize('my_name')).toBe('myName');
         expect(camelize('foo_bar_baz')).toBe('fooBarBaz');
      },
   );

   it(
      'should convert space-separated ' + 'strings to camelCase',
      () => {
         expect(camelize('my name')).toBe('myName');
         expect(camelize('foo bar baz')).toBe('fooBarBaz');
      },
   );

   it('should handle mixed separators', () => {
      expect(camelize('my-name_is cool')).toBe('myNameIsCool');
   });

   it(
      'should return an already camelCase ' + 'string unchanged',
      () => {
         expect(camelize('myName')).toBe('myName');
      },
   );

   it('should handle single character strings', () => {
      expect(camelize('a')).toBe('a');
   });

   it('should handle empty strings', () => {
      expect(camelize('')).toBe('');
   });

   it('should handle strings starting with ' + 'a separator', () => {
      expect(camelize('-my-name')).toBe('MyName');
   });

   it('should handle consecutive separators', () => {
      expect(camelize('my--name')).toBe('myName');
   });
});
