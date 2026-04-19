import { describe, expect, it } from 'vitest';
import { tokenize } from './regex-tokenizer.function';

describe('tokenize()', () => {
   it('should return null past end', () => {
      expect(tokenize(5, 'abc')).toBe(null);
   });

   it('should return end token at' + ' exact end', () => {
      expect(tokenize(3, 'abc')).toEqual(['$$', null, 4]);
   });

   it('should tokenize a plain char', () => {
      const result = tokenize(0, 'a');
      expect(result).toEqual(['char', 'a', 1]);
   });

   it('should tokenize escape sequences', () => {
      const result = tokenize(0, '\\n');
      expect(result).toEqual(['char', '\n', 2]);
   });

   it('should tokenize character class' + ' opener', () => {
      expect(tokenize(0, '[')).toEqual(['[', '[', 1]);
   });

   it('should tokenize negative class' + ' opener', () => {
      expect(tokenize(0, '[^')).toEqual(['[^', '[', 2]);
   });

   it('should tokenize operators', () => {
      expect(tokenize(0, '|')?.[0]).toBe('|');
      expect(tokenize(0, '?')?.[0]).toBe('?');
      expect(tokenize(0, '+')?.[0]).toBe('+');
      expect(tokenize(0, '*')?.[0]).toBe('*');
   });

   it('should tokenize hex escape \\x41', () => {
      const result = tokenize(0, '\\x41');
      expect(result).toEqual(['char', 'A', 3]);
   });

   it('should tokenize unicode \\u0041', () => {
      const result = tokenize(0, '\\u0041');
      expect(result).toEqual(['char', 'A', 5]);
   });

   it('should tokenize range {1,3}', () => {
      const result = tokenize(0, '{1,3}');
      expect(result).toEqual(['range', '1,3', 5]);
   });

   it('should throw on invalid range', () => {
      expect(() => tokenize(0, '{abc}')).toThrow();
   });
});
