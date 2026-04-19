import { describe, expect, it } from 'vitest';
import { parse } from './regex-parser.function';

describe('parse()', () => {
   it('should parse a simple character' + ' sequence', () => {
      const rpn = parse('abc');
      expect(rpn.length).toBeGreaterThan(0);

      const last = rpn[rpn.length - 1];
      expect(last[0]).toBe('$$');
   });

   it('should parse alternation operator', () => {
      const rpn = parse('a|b');
      const tokens = rpn.map((item) => item[0]);
      expect(tokens).toContain('|');
   });

   it('should parse character class', () => {
      const rpn = parse('[a-z]');
      const tokens = rpn.map((item) => item[0]);
      expect(tokens).toContain('[]');
   });

   it('should parse grouping parentheses', () => {
      const rpn = parse('(ab)');
      const tokens = rpn.map((item) => item[0]);
      expect(tokens).toContain('()');
   });

   it('should throw on unmatched paren', () => {
      expect(() => parse('(ab')).toThrow();
   });

   it('should parse postfix operators', () => {
      const rpn = parse('a+');
      const tokens = rpn.map((item) => item[0]);
      expect(tokens).toContain('+');
   });
});
