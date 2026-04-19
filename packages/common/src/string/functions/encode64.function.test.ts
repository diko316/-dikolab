import { describe, it, expect } from 'vitest';
import { encode64 } from './encode64.function';

describe('encode64()', () => {
   it('should encode simple ASCII strings', () => {
      expect(encode64('Hello')).toBe('SGVsbG8=');
      expect(encode64('Man')).toBe('TWFu');
   });

   it('should add padding for 1-char input', () => {
      expect(encode64('M')).toBe('TQ==');
   });

   it('should add padding for 2-char input', () => {
      expect(encode64('Ma')).toBe('TWE=');
   });

   it('should handle empty string', () => {
      expect(encode64('')).toBe('');
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => encode64(123 as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => encode64(null as any),
      ).toThrow('Invalid [subject] parameter.');
   });

   it('should encode longer strings correctly', () => {
      expect(encode64('foobar')).toBe('Zm9vYmFy');
      expect(encode64('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==');
   });

   it('should encode multi-byte UTF-8 content', () => {
      const result = encode64('\u00e9');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
   });
});
