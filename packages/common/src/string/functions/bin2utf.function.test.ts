import { describe, it, expect } from 'vitest';
import { bin2utf } from './bin2utf.function';
import { utf2bin } from './utf2bin.function';

describe('bin2utf()', () => {
   it('should decode ASCII binary unchanged', () => {
      expect(bin2utf('hello')).toBe('hello');
      expect(bin2utf('abc123')).toBe('abc123');
   });

   it(
      'should be the inverse of utf2bin ' + 'for 2-byte characters',
      () => {
         const original = '\u00e9\u00f1\u00fc';
         expect(bin2utf(utf2bin(original))).toBe(original);
      },
   );

   it(
      'should be the inverse of utf2bin ' + 'for 3-byte characters',
      () => {
         const original = '\u4e2d\u6587';
         expect(bin2utf(utf2bin(original))).toBe(original);
      },
   );

   it('should handle empty string', () => {
      expect(bin2utf('')).toBe('');
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => bin2utf(123 as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => bin2utf(null as any),
      ).toThrow('Invalid [subject] parameter.');
   });

   it('should roundtrip mixed content', () => {
      const original = 'Hello \u00e9\u4e16\u754c';
      expect(bin2utf(utf2bin(original))).toBe(original);
   });
});
