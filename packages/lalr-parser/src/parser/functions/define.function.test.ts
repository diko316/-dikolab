import { describe, expect, it } from 'vitest';

import { define, isParser } from '../../index';

describe('define(root, definitions, exclusions)', () => {
   function defineCompleteGrammar() {
      return define(
         'Expr',
         [
            'Expr',
            ['Add'],

            'Add',
            [['Add', /\+/, 'Mul'], 'Mul'],

            'Mul',
            [['Mul', /\*/, 'Unit'], 'Unit'],

            'Unit',
            ['Number', [/\(/, 'Expr', /\)/]],

            'Number',
            [/(\+|\-)?[0-9]+(\.[0-9]+)?/],
         ],
         [/[ \r\n\t]+/],
      );
   }

   function defineNoExclusionsGrammar() {
      return define(
         'Expr',
         [
            'Expr',
            ['Add'],

            'Add',
            [['Add', /\+/, 'Mul'], 'Mul'],

            'Mul',
            [['Mul', /\*/, 'Unit'], 'Unit'],

            'Unit',
            ['Number', [/\(/, 'Expr', /\)/]],

            'Number',
            [/(\+|\-)?[0-9]+(\.[0-9]+)?/],
         ],
         [/[ \r\n\t]+/],
      );
   }

   function defineWrongRoot() {
      return define('FakeRoot', [
         'Expr',
         ['Add'],

         'Add',
         [['Add', /\+/, 'Mul'], 'Mul'],

         'Mul',
         [['Mul', /\*/, 'Unit'], 'Unit'],

         'Unit',
         ['Number', [/\(/, 'Expr', /\)/]],

         'Number',
         [/(\+|\-)?[0-9]+(\.[0-9]+)?/],
      ]);
   }

   function defineWrongParameters() {
      return define(
         null as unknown as string,
         100 as unknown as unknown[],
      );
   }

   it('should define LALR grammar ' + 'without errors', () => {
      expect(defineNoExclusionsGrammar).not.toThrow();
      expect(isParser(defineNoExclusionsGrammar())).toBe(true);
   });

   it('should reject root not in ' + 'grammar definitions', () => {
      expect(defineWrongRoot).toThrow();
   });

   it('should reject invalid parameters', () => {
      expect(defineWrongParameters).toThrow();
   });

   it('should accept exclusions array', () => {
      expect(defineCompleteGrammar).not.toThrow();
      expect(isParser(defineCompleteGrammar())).toBe(true);
   });
});

describe('define() with LL+LR grammar', () => {
   const output = [
      {
         name: '/Buang/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: 'Basic',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Operand',
         type: 2,
         reduceCount: 1,
      },
      {
         name: '/\\=/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: '/\\(/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: '/Chaching/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: 'Basic',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Operand',
         type: 2,
         reduceCount: 1,
      },
      {
         name: '/\\=/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: '/Buang/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: 'Basic',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Operand',
         type: 2,
         reduceCount: 1,
      },
      {
         name: '/\\./',
         type: 1,
         reduceCount: 0,
      },
      {
         name: '/Buang/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: 'Basic',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Operand',
         type: 2,
         reduceCount: 3,
      },
      {
         name: 'Assign',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Assign',
         type: 2,
         reduceCount: 3,
      },
      {
         name: 'Expr',
         type: 2,
         reduceCount: 1,
      },
      {
         name: '/\\)/',
         type: 1,
         reduceCount: 0,
      },
      {
         name: 'Basic',
         type: 2,
         reduceCount: 3,
      },
      {
         name: 'Operand',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Assign',
         type: 2,
         reduceCount: 1,
      },
      {
         name: 'Assign',
         type: 2,
         reduceCount: 3,
      },
      {
         name: 'Expr',
         type: 2,
         reduceCount: 1,
      },
      {
         name: "Expr'",
         type: 4,
         reduceCount: 1,
      },
   ];

   let parser: ReturnType<typeof define>;

   function defineGrammar() {
      parser = define(
         'Expr',
         [
            'Expr',
            ['Assign'],

            'Basic',
            [/Buang/, /Chaching/, [/\(/, 'Expr', /\)/]],

            'Operand',
            [
               'Basic',
               ['Operand', /\./, 'Basic'],
               ['Operand', /\[/, 'Expr', /\]/],
            ],

            'Assign',
            [['Operand', /\=/, 'Assign'], 'Operand'],
         ],
         [/[ \r\n\t]+/],
      );
   }

   it('should define LL+LR grammar', () => {
      expect(defineGrammar).not.toThrow();
   });

   it('should parse string subject', () => {
      let current = -1;

      expect(defineGrammar).not.toThrow();

      const iterator = parser.iterator();
      iterator.set('Buang = (Chaching = ' + 'Buang.Buang)');
      let lexeme = iterator.next();

      for (; lexeme; lexeme = iterator.next()) {
         const item: Record<string, unknown> = {
            name: lexeme.name,
            reduceCount: lexeme.reduceCount,
         };
         if (lexeme.type) {
            item.type = lexeme.type;
         }

         const verify = output[++current];

         expect(item).toEqual(verify);
         expect(iterator.error).toBe(null);
      }
   });
});
