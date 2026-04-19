import { describe, it, expect, beforeEach } from 'vitest';
import {
   run,
   register,
   clearRunner,
   middleware,
} from './runner.function';

describe('runner', () => {
   beforeEach(() => {
      clearRunner('testRun');
      clearRunner('chainRun');
      clearRunner('scopeRun');
   });

   describe('register()', () => {
      it('should throw on invalid name', () => {
         expect(() => {
            register(null as never, () => {});
         }).toThrow('Invalid [name] parameter.');
      });

      it('should throw on invalid handler', () => {
         expect(() => {
            register('testRun', 'notAFunction' as never);
         }).toThrow('Invalid [handler] parameter.');
      });
   });

   describe('run()', () => {
      it('should throw on invalid name', () => {
         expect(() => run(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });

      it(
         'should return undefined when no ' + 'handlers registered',
         () => {
            expect(run('unregistered')).toBeUndefined();
         },
      );

      it('should execute registered handler', () => {
         register('testRun', () => 'ok');
         expect(run('testRun')).toBe('ok');
      });

      it('should pass arguments to handler', () => {
         register('testRun', (a: number, b: number) => a + b);
         expect(run('testRun', [10, 20])).toBe(30);
      });

      it('should use scope as this context', () => {
         const scope = { val: 99 };
         register('scopeRun', function (this: { val: number }) {
            return this.val;
         });
         expect(run('scopeRun', [], scope)).toBe(99);
      });

      it('should chain results through ' + 'multiple handlers', () => {
         register('chainRun', (x: number) => x * 3);
         register('chainRun', (x: number) => x + 1);
         expect(run('chainRun', [2])).toBe(7);
      });
   });

   describe('before/after positioning', () => {
      beforeEach(() => {
         clearRunner('posRun');
      });

      it('should run before handlers via ' + '"before:" prefix', () => {
         register('before:posRun', () => 'before-result');
         expect(run('before:posRun')).toBe('before-result');
      });

      it('should run after handlers via ' + '"after:" prefix', () => {
         register('after:posRun', () => 'after-result');
         expect(run('after:posRun')).toBe('after-result');
      });

      it('should default to after position ' + 'without prefix', () => {
         register('posRun', () => 'default-pos');
         expect(run('after:posRun')).toBe('default-pos');
      });
   });

   describe('clearRunner()', () => {
      it('should throw on invalid name', () => {
         expect(() => {
            clearRunner(null as never);
         }).toThrow('Invalid [name] parameter.');
      });

      it('should clear all handlers', () => {
         register('testRun', () => 'x');
         clearRunner('testRun');
         expect(run('testRun')).toBeUndefined();
      });

      it(
         'should clear only before handlers ' + 'when after=false',
         () => {
            register('before:testRun', () => 'b');
            register('after:testRun', () => 'a');
            clearRunner('testRun', false);
            expect(run('before:testRun')).toBeUndefined();
            expect(run('after:testRun')).toBe('a');
         },
      );

      it(
         'should clear only after handlers ' + 'when after=true',
         () => {
            register('before:testRun', () => 'b');
            register('after:testRun', () => 'a');
            clearRunner('testRun', true);
            expect(run('after:testRun')).toBeUndefined();
            expect(run('before:testRun')).toBe('b');
         },
      );
   });

   describe('middleware()', () => {
      it('should throw on invalid name', () => {
         expect(() => middleware(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });

      it('should return a BaseMiddleware instance', () => {
         const mw = middleware('testNs');
         expect(mw).toBeDefined();
         expect(mw.access).toBe('testNs.');
      });

      it(
         'should return the same instance ' + 'for the same name',
         () => {
            const a = middleware('sameNs');
            const b = middleware('sameNs');
            expect(a).toBe(b);
         },
      );
   });
});
