import { describe, expect, it } from 'vitest';
import { protoClone } from './proto-clone.function';

describe('protoClone()', () => {
   it(
      'should create a new object sharing' +
         " the original's prototype",
      () => {
         const original = { a: 1, b: 2 };
         const cloned = protoClone(original);

         expect(cloned).not.toBe(original);
         expect(cloned.a).toBe(1);
         expect(cloned.b).toBe(2);
      },
   );

   it('should not affect original' + ' when clone is mutated', () => {
      const original = { x: 10 };
      const cloned = protoClone(original);

      cloned.x = 99;

      expect(original.x).toBe(10);
      expect(cloned.x).toBe(99);
   });

   it('should share prototype chain' + ' properties', () => {
      const original = { val: 'hello' };
      const cloned = protoClone(original);

      expect(Object.getPrototypeOf(cloned)).toBe(original);
   });
});
