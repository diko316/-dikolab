import { describe, it, expect } from 'vitest';
import { isNativeObject } from './is-native-object.function';

describe('isNativeObject()', () => {
   it(
      'should return true for plain objects ' +
         'with Object constructor',
      () => {
         expect(isNativeObject({})).toBe(true);
         expect(isNativeObject({ a: 1 })).toBe(true);
         expect(isNativeObject(new Object())).toBe(true);
      },
   );

   it('should return false for ' + 'Object.create(null)', () => {
      expect(isNativeObject(Object.create(null))).toBe(false);
   });

   it('should return false for class instances', () => {
      class MyClass {}
      expect(isNativeObject(new MyClass())).toBe(false);
   });

   it('should return false for non-object types', () => {
      expect(isNativeObject(null)).toBe(false);
      expect(isNativeObject(undefined)).toBe(false);
      expect(isNativeObject(42)).toBe(false);
      expect(isNativeObject('hello')).toBe(false);
      expect(isNativeObject(true)).toBe(false);
   });

   it(
      'should return false for arrays ' + 'and other object types',
      () => {
         expect(isNativeObject([])).toBe(false);
         expect(isNativeObject(new Date())).toBe(false);
         expect(isNativeObject(/test/)).toBe(false);
         expect(isNativeObject(() => {})).toBe(false);
      },
   );

   it(
      'should handle objects with own ' + 'constructor property',
      () => {
         const obj = { constructor: 'custom' };
         expect(isNativeObject(obj)).toBe(true);
      },
   );

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isNativeObject(NaN)).toBe(false);
      expect(isNativeObject(Infinity)).toBe(false);
   });

   it('should narrow to generic type ' + 'with type predicate', () => {
      interface Settings {
         theme: string;
         fontSize: number;
      }
      const data: unknown = {
         theme: 'dark',
         fontSize: 14,
      };
      if (isNativeObject<Settings>(data)) {
         expect(data.theme).toBe('dark');
         expect(data.fontSize).toBe(14);
      }
   });
});
