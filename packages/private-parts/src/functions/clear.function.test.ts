import { beforeEach, describe, expect, it } from 'vitest';
import { set } from './set.function';
import { clear } from './clear.function';
import { get } from './get.function';
import { clearAll } from './clear-all.function';

describe('clear(instance)', () => {
   class MyClass {
      get name(): string {
         return get(this, 'name');
      }

      constructor(name: string) {
         set(this, 'name', name);
      }
   }

   const targetInstance1 = new MyClass('mocked');

   const targetInstance2 = new MyClass('another mocked');

   beforeEach(() => {
      clearAll();
      set(targetInstance1, 'hiddenName', 'diko');
      set(targetInstance1, 'age', 1);

      set(targetInstance2, 'hiddenName', 'diko2');
      set(targetInstance2, 'age', 46);
   });

   it('should clear all key/value related to instance', () => {
      clear(targetInstance1);

      const hiddeName = get(targetInstance1, 'hiddenName');
      const age = get(targetInstance1, 'age');
      const name = get(targetInstance1, 'name');

      expect(hiddeName).toBeUndefined();
      expect(age).toBeUndefined();
      expect(name).toBeUndefined();

      expect(get(targetInstance2, 'hiddenName')).toBe('diko2');
      expect(get(targetInstance2, 'age')).toBe(46);
   });
});
