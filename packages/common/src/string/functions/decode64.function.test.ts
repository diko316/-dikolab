import { describe, it, expect } from 'vitest';
import { decode64 } from './decode64.function';
import { encode64 } from './encode64.function';

describe('decode64()', () => {
   it('should decode simple base64 strings', () => {
      expect(decode64('SGVsbG8=')).toBe('Hello');
      expect(decode64('TWFu')).toBe('Man');
   });

   it('should decode padded strings', () => {
      expect(decode64('TQ==')).toBe('M');
      expect(decode64('TWE=')).toBe('Ma');
   });

   it('should handle empty string', () => {
      expect(decode64('')).toBe('');
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => decode64(123 as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => decode64(null as any),
      ).toThrow('Invalid [subject] parameter.');
   });

   it('should throw for invalid base64 chars', () => {
      expect(() => decode64('!@#$')).toThrow(
         'Invalid [subject] parameter.',
      );
   });

   it('should roundtrip with encode64', () => {
      expect(decode64(encode64('Hello, World!'))).toBe('Hello, World!');
      expect(decode64(encode64('foobar'))).toBe('foobar');
   });

   it('should roundtrip multi-byte UTF-8', () => {
      const original = '\u00e9\u00f1';
      expect(decode64(encode64(original))).toBe(original);
   });

   it('should decode longer strings', () => {
      expect(decode64('Zm9vYmFy')).toBe('foobar');
      expect(decode64('SGVsbG8sIFdvcmxkIQ==')).toBe('Hello, World!');
   });
});
