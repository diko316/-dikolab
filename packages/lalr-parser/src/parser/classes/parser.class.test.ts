import { describe, expect, it } from 'vitest';

import { define, Iterator, registerIterator } from '../../index';

function createParser() {
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
      [/[ \t]+/],
   );
}

describe('Parser toJSON() / toObject()', () => {
   it('should export JSON string', () => {
      let json: string | undefined;

      function exportToJSON() {
         const parser = createParser();
         json = parser.toJSON();
         return json;
      }

      expect(exportToJSON).not.toThrow();
      json = exportToJSON();

      expect(typeof json).toBe('string');
      expect(json).not.toBe('');
   });

   it('should export Object', () => {
      function exportToObject() {
         const parser = createParser();
         return parser.toObject();
      }

      expect(exportToObject).not.toThrow();
      expect(Object.prototype.toString.call(exportToObject())).toBe(
         '[object Object]',
      );
   });
});

describe('Parser fromJSON()', () => {
   it('should load Object data', () => {
      let obj: unknown;
      let parser: ReturnType<typeof createParser>;

      function exportToObject() {
         obj = createParser().toObject();
      }

      function importObject() {
         parser = createParser();
         parser.fromJSON(obj as string);
      }

      expect(exportToObject).not.toThrow();
      expect(Object.prototype.toString.call(obj)).toBe(
         '[object Object]',
      );
      expect(importObject).not.toThrow();
      expect(parser!.ready).toBe(true);
   });

   it('should load JSON string', () => {
      let json: string;
      let parser: ReturnType<typeof createParser>;

      function exportToJSON() {
         json = createParser().toJSON();
      }

      function importJSON() {
         parser = createParser();
         parser.fromJSON(json!);
      }

      expect(exportToJSON).not.toThrow();
      expect(importJSON).not.toThrow();
      expect(typeof json!).toBe('string');
      expect(parser!.ready).toBe(true);
   });
});

describe('Parser iterator()', () => {
   it('should create default iterator', () => {
      let iterator: unknown;

      function createIterator() {
         iterator = createParser().iterator();
      }

      expect(createIterator).not.toThrow();
      expect(iterator instanceof Iterator).toBe(true);
   });

   it('should create registered iterator', () => {
      let iterator: unknown;

      class SubClass extends Iterator {}

      function setup() {
         registerIterator('custom', SubClass);
      }

      function createIterator() {
         iterator = createParser().iterator('custom');
      }

      expect(setup).not.toThrow();
      expect(createIterator).not.toThrow();
      expect(iterator instanceof SubClass).toBe(true);
   });

   it('should reject unregistered name', () => {
      function createIterator() {
         createParser().iterator('buang');
      }

      expect(createIterator).toThrow();
   });
});
