import { describe, it, expect } from 'vitest';
import { instantiate } from './instantiate.function';

describe('instantiate', () => {
   it(
      'should create an instance with the ' + 'correct prototype',
      () => {
         class MyClass {
            greet() {
               return 'hello';
            }
         }

         const instance = instantiate(MyClass);

         expect(instance).toBeInstanceOf(MyClass);
         expect(instance.greet()).toBe('hello');
      },
   );

   it('should not call the constructor', () => {
      let called = false;

      class MyClass {
         constructor() {
            called = true;
         }
      }

      instantiate(MyClass);
      expect(called).toBe(false);
   });

   it('should apply overrides to the instance', () => {
      class MyClass {
         name = 'default';
      }

      const instance = instantiate(MyClass, {
         name: 'overridden',
         extra: true,
      });

      expect(instance.name).toBe('overridden');
      expect(instance.extra).toBe(true);
   });

   it('should return plain instance without ' + 'overrides', () => {
      class MyClass {}
      const instance = instantiate(MyClass);

      expect(instance).toBeInstanceOf(MyClass);
      expect(Object.getOwnPropertyNames(instance)).toEqual([]);
   });

   it('should ignore non-object overrides', () => {
      class MyClass {}

      const instance = instantiate(MyClass, null as never);

      expect(instance).toBeInstanceOf(MyClass);
   });

   it('should work with empty overrides', () => {
      class MyClass {}
      const instance = instantiate(MyClass, {});
      expect(instance).toBeInstanceOf(MyClass);
   });
});
