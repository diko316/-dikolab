import { describe, it, expect } from 'vitest';
import { isThenable } from './is-thenable.function';

describe('isThenable()', () => {
   it('should return true for native Promises', () => {
      expect(isThenable(Promise.resolve(1))).toBe(true);
      expect(
         isThenable(
            new Promise<void>((r) => {
               r();
            }),
         ),
      ).toBe(true);
   });

   it('should return true for thenable objects', () => {
      const thenable = { then: () => {} };
      expect(isThenable(thenable)).toBe(true);
   });

   it('should return false when then is not ' + 'a function', () => {
      expect(isThenable({ then: 42 })).toBe(false);
      expect(isThenable({ then: 'string' })).toBe(false);
      expect(isThenable({ then: true })).toBe(false);
   });

   it('should return false for null ' + 'and undefined', () => {
      expect(isThenable(null)).toBe(false);
      expect(isThenable(undefined)).toBe(false);
   });

   it('should return false for booleans', () => {
      expect(isThenable(true)).toBe(false);
      expect(isThenable(false)).toBe(false);
   });

   it('should return false for primitives', () => {
      expect(isThenable(42)).toBe(false);
      expect(isThenable('hello')).toBe(false);
      expect(isThenable(0)).toBe(false);
      expect(isThenable('')).toBe(false);
   });

   it('should return false for plain objects ' + 'without then', () => {
      expect(isThenable({})).toBe(false);
      expect(isThenable({ foo: 1 })).toBe(false);
   });

   it('should return false for NaN ' + 'and Infinity', () => {
      expect(isThenable(NaN)).toBe(false);
      expect(isThenable(Infinity)).toBe(false);
   });

   it('should return false for arrays ' + 'and functions', () => {
      expect(isThenable([])).toBe(false);
      expect(isThenable(() => {})).toBe(false);
   });

   it('should detect async function ' + 'return values', () => {
      const result = (async () => 42)();
      expect(isThenable(result)).toBe(true);
   });

   it(
      'should route thenable vs non-thenable ' + 'in executor pattern',
      () => {
         function formatReturn(value: unknown): string {
            return isThenable(value) ? 'async' : 'sync';
         }
         expect(formatReturn(Promise.resolve(1))).toBe('async');
         expect(formatReturn({ then: () => {} })).toBe('async');
         expect(formatReturn(42)).toBe('sync');
         expect(formatReturn('hello')).toBe('sync');
         expect(formatReturn(null)).toBe('sync');
      },
   );

   it('should detect custom thenable with ' + 'then and catch', () => {
      const custom = {
         then: (cb: () => void) => {
            cb();
         },
         catch: (cb: () => void) => {
            cb();
         },
      };
      expect(isThenable(custom)).toBe(true);
   });

   it('should narrow to typed ' + 'PromiseLike<T>', () => {
      const data: unknown = Promise.resolve(42);
      if (isThenable<number>(data)) {
         data.then((val) => {
            expect(val).toBe(42);
         });
      }
   });
});
