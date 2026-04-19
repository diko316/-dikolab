import { describe, expect, it } from 'vitest';

import { Iterator, registerIterator } from '../../index';

describe('registerIterator(name, Class)', () => {
   function createSubclass() {
      class NewIterator extends Iterator {}
      return NewIterator;
   }

   it('should register a subclass of ' + 'Iterator', () => {
      function register() {
         registerIterator('subclass', createSubclass());
      }

      expect(register).not.toThrow();
   });

   it('should reject non-subclass', () => {
      function registerNonSubclass() {
         class Fake {}
         registerIterator('subclass', Fake as never);
      }

      expect(registerNonSubclass).toThrow();
   });

   it('should reject invalid name', () => {
      function registerInvalidName() {
         registerIterator(null as unknown as string, createSubclass());
      }

      function registerInvalidName1() {
         registerIterator(100 as unknown as string, createSubclass());
      }

      expect(registerInvalidName).toThrow();
      expect(registerInvalidName1).toThrow();
   });
});
