import { describe, expect, it, beforeEach } from 'vitest';

import { define, load, isParser } from '../../index';

describe('load(json)', () => {
   let exported: string;

   beforeEach(() => {
      const parser = define(
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
      exported = parser.toJSON();
   });

   it('should load from JSON string', () => {
      const param = exported;

      function doLoad() {
         return load(param);
      }

      expect(doLoad).not.toThrow();
      expect(isParser(doLoad())).toBe(true);
   });

   it('should load from Object', () => {
      const param = exported;

      function doLoad() {
         return load(JSON.parse(param));
      }

      expect(doLoad).not.toThrow();
      expect(isParser(doLoad())).toBe(true);
   });
});
