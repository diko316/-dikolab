import { describe, expect, it } from 'vitest';

import { define } from '../../index';

function defineSampleParser() {
   return define(
      'Sentence',
      [
         'Sentence',
         [
            ['Subject', 'IVerb'],
            ['Subject', 'TVerb', 'Object'],
         ],

         'Noun',
         [
            /diko/,
            /draegan/,
            /cha/,
            /aerin/,
            /room/,
            /car/,
            /dvd\-drive/,
         ],

         'Subject',
         [[/the/, 'Noun'], 'Noun'],

         'Object',
         [
            [/of/, 'Subject'],
            [/to/, 'Subject'],
            [/on/, 'Subject'],
            [/about/, 'Subject'],
            'Subject',
         ],

         'TVerb',
         [/jump/, /run|walk/, /look/],

         'IVerb',
         [/jumped/, /ran|walked/, /looked/, ['LVerb', 'SCompliment']],

         'SCompliment',
         [/beautiful/, /cute/, /bare/],

         'LVerb',
         [/is|are/],
      ],
      [/[ \t]+/],
   );
}

describe('BaseIterator set()', () => {
   it('should set subject string', () => {
      const subject = 'diko is beautiful';

      function createIterator() {
         const parser = defineSampleParser();
         const iterator = parser.iterator();
         iterator.set(subject);
         return iterator;
      }

      let iterator: ReturnType<typeof createIterator>;

      expect(() => {
         iterator = createIterator();
      }).not.toThrow();

      expect(iterator!.error).toBe(null);
   });
});

describe('BaseIterator next()', () => {
   it('should return lexemes from tokens', () => {
      const subject = 'diko is beautiful';
      const parser = defineSampleParser();
      const iterator = parser.iterator();
      iterator.set(subject);

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: '/diko/',
            value: 'diko',
            reduceCount: 0,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'Noun',
            reduceCount: 1,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'Subject',
            reduceCount: 1,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: '/is|are/',
            value: 'is',
            reduceCount: 0,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'LVerb',
            reduceCount: 1,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: '/beautiful/',
            value: 'beautiful',
            reduceCount: 0,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'SCompliment',
            reduceCount: 1,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'IVerb',
            reduceCount: 2,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: 'Sentence',
            reduceCount: 2,
         }),
      );

      expect(iterator.next()).toEqual(
         expect.objectContaining({
            name: "Sentence'",
            reduceCount: 1,
         }),
      );

      expect(iterator.error).toBe(null);
   });
});
