import { describe, it, expect } from 'vitest';
import { trim } from './trim.function';

describe('trim()', () => {
   it('should remove leading and trailing ' + 'whitespace', () => {
      expect(trim('  hello  ')).toBe('hello');
      expect(trim('\thello\t')).toBe('hello');
      expect(trim('\nhello\n')).toBe('hello');
   });

   it('should remove only leading whitespace', () => {
      expect(trim('  hello')).toBe('hello');
   });

   it('should remove only trailing whitespace', () => {
      expect(trim('hello  ')).toBe('hello');
   });

   it('should preserve inner whitespace', () => {
      expect(trim('  hello world  ')).toBe('hello world');
   });

   it('should return string with no ' + 'whitespace unchanged', () => {
      expect(trim('hello')).toBe('hello');
   });

   it('should handle empty string', () => {
      expect(trim('')).toBe('');
   });

   it('should handle whitespace-only strings', () => {
      expect(trim('   ')).toBe('');
      expect(trim('\t\n ')).toBe('');
   });

   it('should throw for non-string input', () => {
      expect(
         // eslint-disable-next-line
            () => trim(123 as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => trim(null as any),
      ).toThrow('Invalid [subject] parameter.');
      expect(
         // eslint-disable-next-line
            () => trim(undefined as any),
      ).toThrow('Invalid [subject] parameter.');
   });

   it('should handle mixed whitespace types', () => {
      expect(trim(' \t\n hello \t\n ')).toBe('hello');
   });
});
