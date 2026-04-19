import { describe, it, expect, beforeEach } from 'vitest';
import { BaseMiddleware } from './base-middleware.class';
import { clearRunner } from '../functions/runner.function';

describe('BaseMiddleware', () => {
   const NS = 'test-mw.';
   let mw: BaseMiddleware;

   beforeEach(() => {
      mw = new BaseMiddleware(NS);
      mw.clear('myAction');
      mw.clear('chainAction');
   });

   describe('constructor', () => {
      it('should set the access property', () => {
         expect(mw.access).toBe(NS);
      });
   });

   describe('register() and run()', () => {
      it('should register and run a handler', () => {
         let called = false;
         mw.register('myAction', () => {
            called = true;
            return 'result';
         });
         const result = mw.run('myAction');
         expect(called).toBe(true);
         expect(result).toBe('result');
      });

      it('should return this from register', () => {
         const result = mw.register('myAction', () => {});
         expect(result).toBe(mw);
      });

      it('should pass args to handler', () => {
         mw.register('myAction', (a: number, b: number) => a + b);
         const result = mw.run('myAction', [3, 4]);
         expect(result).toBe(7);
      });

      it('should pass scope to handler', () => {
         const scope = { value: 42 };
         mw.register('myAction', function (this: { value: number }) {
            return this.value;
         });
         const result = mw.run('myAction', [], scope);
         expect(result).toBe(42);
      });

      it('should chain results through ' + 'multiple handlers', () => {
         mw.register('chainAction', (x: number) => x * 2);
         mw.register('chainAction', (x: number) => x + 1);
         const result = mw.run('chainAction', [5]);
         expect(result).toBe(11);
      });
   });

   describe('clear()', () => {
      it('should clear all handlers for ' + 'a name', () => {
         mw.register('myAction', () => 'hello');
         const result = mw.clear('myAction');
         expect(result).toBe(mw);
         expect(mw.run('myAction')).toBeUndefined();
      });

      it(
         'should clear only after handlers ' + 'when after=true',
         () => {
            mw.register('before:myAction', () => 'before');
            mw.register('after:myAction', () => 'after');
            mw.clear('myAction', true);
            expect(mw.run('after:myAction')).toBeUndefined();
            expect(mw.run('before:myAction')).toBe('before');
            // cleanup
            mw.clear('myAction');
         },
      );

      it('should throw on invalid name', () => {
         expect(() => mw.clear(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });
   });
});
