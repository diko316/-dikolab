import { describe, expect, it, beforeEach } from 'vitest';
import { Tokenizer } from './tokenizer.class';

describe('Tokenizer', () => {
   describe('define()', () => {
      it(
         'should define tokens with' +
            ' define([name, regex...]) params',
         () => {
            const tokenizer = new Tokenizer();

            tokenizer.define(['name', /regex/, /name/]);
         },
      );

      it(
         'should not define tokens with' + ' define(non-array) params',
         () => {
            const tokenizer = new Tokenizer();

            expect(() => tokenizer.define(null as never)).toThrow();
            expect(() => tokenizer.define('string' as never)).toThrow();
            expect(() => tokenizer.define(100 as never)).toThrow();
         },
      );

      it('should treat "-" as character' + ' outside class []', () => {
         const tokenizer = new Tokenizer();

         expect(() =>
            tokenizer.define(['test', /abcd-def/]),
         ).not.toThrow();
      });

      it('should handle "[d-d]" range' + ' in class []', () => {
         const tokenizer = new Tokenizer();

         expect(() =>
            tokenizer.define(['test', /abc[d-d]ef/]),
         ).not.toThrow();

         expect(tokenizer.tokenize(0, 'abcdef')).toEqual([
            'test',
            'abcdef',
            6,
         ]);
      });

      it('should reject regex resulting' + ' in empty token', () => {
         const tokenizer = new Tokenizer();

         expect(() =>
            tokenizer.define(['test', /[a-z0-9]?/]),
         ).toThrow();
         expect(() =>
            tokenizer.define(['test', /[a-z0-9]*/]),
         ).toThrow();
      });
   });

   describe('toJSON() / toObject()', () => {
      it('should export FSM data as' + ' JSON string', () => {
         const tokenizer = new Tokenizer();

         tokenizer.define([
            'number',
            /[0-9]+/,
            'sequence',
            /a-c]+/,
            /[d-z]+/,
            /[A-Z]+/,
         ]);

         const json = tokenizer.toJSON();

         expect(typeof json).toBe('string');
         expect(() => JSON.parse(json)).not.toThrow();
         expect(JSON.parse(json)).toBeDefined();
      });

      it('should export FSM data as object', () => {
         const tokenizer = new Tokenizer();

         tokenizer.define([
            'number',
            /[0-9]+/,
            'sequence',
            /a-c]+/,
            /[d-z]+/,
            /[A-Z]+/,
         ]);

         const data = tokenizer.toObject();

         expect(Object.prototype.toString.call(data)).toBe(
            '[object Object]',
         );
         expect(data).toBeDefined();
      });
   });

   describe('fromJSON()', () => {
      let json: string;

      beforeEach(() => {
         const tokenizer = new Tokenizer();

         tokenizer.define([
            'number',
            /[0-9]+/,
            'sequence',
            /a-c]+/,
            /[d-z]+/,
            /[A-Z]+/,
         ]);

         json = tokenizer.toJSON();
      });

      it('should import JSON string' + ' NFA FSM data', () => {
         const tokenizer = new Tokenizer();
         let error: Error | null = null;

         try {
            tokenizer.fromJSON(json);
         } catch (e) {
            error = e as Error;
         }

         expect(error).toBe(null);
      });

      it('should import object NFA FSM data', () => {
         const tokenizer = new Tokenizer();
         let error: Error | null = null;

         const fsm = JSON.parse(json);

         try {
            tokenizer.fromJSON(fsm);
         } catch (e) {
            error = e as Error;
         }

         expect(error).toBe(null);
      });

      it('should not import non-object' + ' or non-JSON-string', () => {
         const tokenizer = new Tokenizer();

         expect(() => tokenizer.fromJSON(null as never)).toThrow();

         expect(() =>
            tokenizer.fromJSON(new Date() as never),
         ).toThrow();

         expect(() => tokenizer.fromJSON(100 as never)).toThrow();
      });
   });

   describe('tokenize()', () => {
      it('should run basic tokenization', () => {
         const tokenizer = new Tokenizer();
         const subject = '12345abc67890';

         tokenizer.define([
            'number',
            /[0-9]+/,
            'sequence',
            /[a-c]+/,
            /[d-z]+/,
            /[A-Z]+/,
         ]);

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'number',
            '12345',
            5,
         ]);

         expect(tokenizer.tokenize(5, subject)).toEqual([
            'sequence',
            'abc',
            8,
         ]);

         expect(tokenizer.tokenize(8, subject)).toEqual([
            'number',
            '67890',
            13,
         ]);

         expect(tokenizer.tokenize(13, subject)).toEqual(['$', '', 14]);

         expect(tokenizer.tokenize(14, subject)).toEqual(null);
      });
   });

   describe('alternation "|"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'linking_verb',
            /are|is|was|were/,
            'subject',
            /diko|people/,
            'adjective',
            /good|cute|innocent/,
            'space',
            /[ \r\n\t]/,
            'period',
            /\./,
         ]);
         return tokenizer;
      };

      it('should declare tokens with' + ' "|" pattern', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize string with' + ' alternation', () => {
         const tokenizer = predefined();
         const subject = 'diko is cute.' + ' people are innocent.';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'subject',
            'diko',
            4,
         ]);
         expect(tokenizer.tokenize(4, subject)).toEqual([
            'space',
            ' ',
            5,
         ]);
         expect(tokenizer.tokenize(5, subject)).toEqual([
            'linking_verb',
            'is',
            7,
         ]);
         expect(tokenizer.tokenize(7, subject)).toEqual([
            'space',
            ' ',
            8,
         ]);
         expect(tokenizer.tokenize(8, subject)).toEqual([
            'adjective',
            'cute',
            12,
         ]);
         expect(tokenizer.tokenize(12, subject)).toEqual([
            'period',
            '.',
            13,
         ]);
         expect(tokenizer.tokenize(13, subject)).toEqual([
            'space',
            ' ',
            14,
         ]);
         expect(tokenizer.tokenize(14, subject)).toEqual([
            'subject',
            'people',
            20,
         ]);
         expect(tokenizer.tokenize(20, subject)).toEqual([
            'space',
            ' ',
            21,
         ]);
         expect(tokenizer.tokenize(21, subject)).toEqual([
            'linking_verb',
            'are',
            24,
         ]);
         expect(tokenizer.tokenize(24, subject)).toEqual([
            'space',
            ' ',
            25,
         ]);
         expect(tokenizer.tokenize(25, subject)).toEqual([
            'adjective',
            'innocent',
            33,
         ]);
         expect(tokenizer.tokenize(33, subject)).toEqual([
            'period',
            '.',
            34,
         ]);
         expect(tokenizer.tokenize(34, subject)).toEqual(['$', '', 35]);
      });
   });

   describe('character class "[]"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'guitar_chords',
            /[a-defg]+/,
            'h_to_m',
            /[hijklm]+/,
            'others',
            /[n-z]+/,
            'number',
            /[\+|\-]?[0-9]+/,
            'decimal',
            /[\+|\-]?[0-9]+(\.[0-9]+)?/,
            'string',
            /\"(\\\"|[^\"])*\"/,
            /\'(\\\'|[^\'])*\'/,
         ]);
         return tokenizer;
      };

      it('should define tokens with' + ' character class', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize with' + ' character class patterns', () => {
         const tokenizer = predefined();
         const subject = 'cdazn+1098m023.01';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'guitar_chords',
            'cda',
            3,
         ]);
         expect(tokenizer.tokenize(3, subject)).toEqual([
            'others',
            'zn',
            5,
         ]);
         expect(tokenizer.tokenize(5, subject)).toEqual([
            'number',
            '+1098',
            10,
         ]);
         expect(tokenizer.tokenize(10, subject)).toEqual([
            'h_to_m',
            'm',
            11,
         ]);
         expect(tokenizer.tokenize(11, subject)).toEqual([
            'decimal',
            '023.01',
            17,
         ]);
         expect(tokenizer.tokenize(17, subject)).toEqual(['$', '', 18]);
      });
   });

   describe('negative class "[^]"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'guitar_chords',
            /[a-defg]+/,
            'h_to_m',
            /[hijklm]+/,
            'others',
            /[n-z]+/,
            'number',
            /[\+|\-]?[0-9]+/,
            'decimal',
            /[\+|\-]?[0-9]+(\.[0-9]+)?/,
            'string',
            /\"(\\\"|[^\"])*\"/,
            /\'(\\\'|[^\'])*\'/,
            'non_alphanumeric',
            /[^\+\-\"\'a-z0-9]+/,
         ]);
         return tokenizer;
      };

      it('should define tokens with' + ' negative class', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize with' + ' negative class patterns', () => {
         const tokenizer = predefined();
         const subject = 'cdazn+1098m023.01 ()&^%$#fd';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'guitar_chords',
            'cda',
            3,
         ]);
         expect(tokenizer.tokenize(3, subject)).toEqual([
            'others',
            'zn',
            5,
         ]);
         expect(tokenizer.tokenize(5, subject)).toEqual([
            'number',
            '+1098',
            10,
         ]);
         expect(tokenizer.tokenize(10, subject)).toEqual([
            'h_to_m',
            'm',
            11,
         ]);
         expect(tokenizer.tokenize(11, subject)).toEqual([
            'decimal',
            '023.01',
            17,
         ]);
         expect(tokenizer.tokenize(17, subject)).toEqual([
            'non_alphanumeric',
            ' ()&^%$#',
            25,
         ]);
         expect(tokenizer.tokenize(25, subject)).toEqual([
            'guitar_chords',
            'fd',
            27,
         ]);
         expect(tokenizer.tokenize(27, subject)).toEqual(['$', '', 28]);
      });
   });

   describe('optional "?"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'dikofied',
            /diko(Version[0-9]+)?t?/,
            'number',
            /[\+|\-]?[0-9]+/,
         ]);
         return tokenizer;
      };

      it('should define tokens with' + ' optional operator', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize with' + ' optional patterns', () => {
         const tokenizer = predefined();
         const subject = '0912diko+2dikoVersion3t9';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'number',
            '0912',
            4,
         ]);
         expect(tokenizer.tokenize(4, subject)).toEqual([
            'dikofied',
            'diko',
            8,
         ]);
         expect(tokenizer.tokenize(8, subject)).toEqual([
            'number',
            '+2',
            10,
         ]);
         expect(tokenizer.tokenize(10, subject)).toEqual([
            'dikofied',
            'dikoVersion3t',
            23,
         ]);
         expect(tokenizer.tokenize(23, subject)).toEqual([
            'number',
            '9',
            24,
         ]);
         expect(tokenizer.tokenize(24, subject)).toEqual(['$', '', 25]);
      });
   });

   describe('repeat "+"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'dikofied',
            /diko(xx[0-9])+t+/,
            'multi_sign_number',
            /[\+|\-]*[0-9]+/,
         ]);
         return tokenizer;
      };

      it('should define tokens with' + ' repeat "+" operator', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize with' + ' repeat "+" patterns', () => {
         const tokenizer = predefined();
         const subject = '0912dikoxx5t+2dikoxx3xx4t9';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'multi_sign_number',
            '0912',
            4,
         ]);
         expect(tokenizer.tokenize(4, subject)).toEqual([
            'dikofied',
            'dikoxx5t',
            12,
         ]);
         expect(tokenizer.tokenize(12, subject)).toEqual([
            'multi_sign_number',
            '+2',
            14,
         ]);
         expect(tokenizer.tokenize(14, subject)).toEqual([
            'dikofied',
            'dikoxx3xx4t',
            25,
         ]);
         expect(tokenizer.tokenize(25, subject)).toEqual([
            'multi_sign_number',
            '9',
            26,
         ]);
         expect(tokenizer.tokenize(26, subject)).toEqual(['$', '', 27]);
      });
   });

   describe('Kleene star "*"', () => {
      const predefined = () => {
         const tokenizer = new Tokenizer();
         tokenizer.define([
            'dikofied',
            /diko(xx[0-9]+)*t*/,
            'multi_sign_number',
            /[\+|\-]*[0-9]+/,
         ]);
         return tokenizer;
      };

      it('should define tokens with' + ' Kleene star operator', () => {
         expect(predefined).not.toThrow();
      });

      it('should tokenize with' + ' Kleene star patterns', () => {
         const tokenizer = predefined();
         const subject = '0912diko+2dikoxx3tttttt9';

         expect(tokenizer.tokenize(0, subject)).toEqual([
            'multi_sign_number',
            '0912',
            4,
         ]);
         expect(tokenizer.tokenize(4, subject)).toEqual([
            'dikofied',
            'diko',
            8,
         ]);
         expect(tokenizer.tokenize(8, subject)).toEqual([
            'multi_sign_number',
            '+2',
            10,
         ]);
         expect(tokenizer.tokenize(10, subject)).toEqual([
            'dikofied',
            'dikoxx3tttttt',
            23,
         ]);
         expect(tokenizer.tokenize(23, subject)).toEqual([
            'multi_sign_number',
            '9',
            24,
         ]);
         expect(tokenizer.tokenize(24, subject)).toEqual(['$', '', 25]);
      });
   });
});
