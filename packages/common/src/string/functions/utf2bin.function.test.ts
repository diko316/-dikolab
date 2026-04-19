import { describe, it, expect } from 'vitest';
import { utf2bin } from './utf2bin.function';

describe('utf2bin()', () => {
   it('should encode ASCII characters ' + 'unchanged', () => {
      expect(utf2bin('hello')).toBe('hello');
      expect(utf2bin('abc123')).toBe('abc123');
   });

   it('should encode 2-byte UTF-8 characters', () => {
      const result = utf2bin('\u00e9');
      expect(result.length).toBe(2);
   });

   it('should encode 3-byte UTF-8 characters', () => {
      const result = utf2bin('\u4e2d');
      expect(result.length).toBe(3);
   });

   it('should handle empty string', () => {
      expect(utf2bin('')).toBe('');
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => utf2bin(123 as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => utf2bin(null as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => utf2bin(undefined as any),
      ).toThrow('Invalid [subject] parameter.');
   });

   it(
      'should handle mixed ASCII and ' + 'multi-byte characters',
      () => {
         const result = utf2bin('a\u00e9b');
         expect(result.length).toBe(4);
         expect(result.charAt(0)).toBe('a');
         expect(result.charAt(3)).toBe('b');
      },
   );
});
