import { describe, it, expect, vi } from 'vitest';
import { setAsync, clearAsync } from './set-async.function';

describe('setAsync()', () => {
   it('should throw on invalid handler', () => {
      expect(() => setAsync('notAFunction' as never)).toThrow(
         'Invalid [handler] parameter.',
      );
   });

   it('should throw on null handler', () => {
      expect(() => setAsync(null as never)).toThrow(
         'Invalid [handler] parameter.',
      );
   });

   it('should schedule a callback ' + 'asynchronously', async () => {
      const fn = vi.fn();
      setAsync(fn);
      expect(fn).not.toHaveBeenCalled();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(fn).toHaveBeenCalledOnce();
   });

   it('should return a cancellable id', () => {
      const id = setAsync(() => {});
      expect(id).toBeDefined();
      clearAsync(id);
   });
});

describe('clearAsync()', () => {
   it('should cancel a scheduled callback', async () => {
      const fn = vi.fn();
      const id = setAsync(fn);
      clearAsync(id);
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(fn).not.toHaveBeenCalled();
   });

   it('should not throw on invalid id', () => {
      expect(() => {
         clearAsync(undefined);
      }).not.toThrow();
      expect(() => {
         clearAsync(null);
      }).not.toThrow();
      expect(() => {
         clearAsync(12345);
      }).not.toThrow();
   });
});
