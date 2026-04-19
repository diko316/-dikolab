import { describe, it, expect } from 'vitest';
import { assign, assignAll } from './assign.function';

describe('assignAll', () => {
   it('should copy source properties to target', () => {
      const target = {};
      const source = { a: 1, b: 2 };
      const result = assignAll(target, source);

      expect(result).toBe(target);
      expect(target).toEqual({ a: 1, b: 2 });
   });

   it('should apply defaults before source', () => {
      const target = {};
      const source = { a: 1 };
      const defaults = { a: 0, b: 2 };

      assignAll(target, source, defaults);

      expect(target).toEqual({ a: 1, b: 2 });
   });

   it('should overwrite target properties', () => {
      const target = { a: 'old' };
      assignAll(target, { a: 'new' });
      expect(target).toEqual({ a: 'new' });
   });
});

describe('assign', () => {
   it('should copy source properties to target', () => {
      const target = {};
      const source = { x: 10, y: 20 };
      const result = assign(target, source);

      expect(result).toBe(target);
      expect(target).toEqual({ x: 10, y: 20 });
   });

   it('should apply defaults then source', () => {
      const target = {};
      const defaults = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };

      assign(target, source, defaults);

      expect(target).toEqual({ a: 1, b: 3, c: 4 });
   });

   it('should throw for invalid target', () => {
      expect(() => assign(null as never, {})).toThrow(
         'Invalid [target] parameter.',
      );
   });

   it('should throw for invalid source', () => {
      expect(() => assign({}, null as never)).toThrow(
         'Invalid [source] parameter.',
      );
   });

   it('should throw for invalid defaults', () => {
      expect(() => assign({}, {}, 'bad' as never)).toThrow(
         'Invalid [defaults] parameter.',
      );
   });

   it('should treat boolean defaults as ownedOnly', () => {
      const proto = { inherited: 'yes' };
      const source = Object.create(proto);
      source.own = 'yes';
      const target = {};

      assign(target, source, true);
      expect(target).toEqual({ own: 'yes' });
   });

   it(
      'should include inherited when ownedOnly ' +
         'is false via boolean defaults',
      () => {
         const proto = { inherited: 'yes' };
         const source = Object.create(proto);
         source.own = 'yes';
         const target = {};

         assign(target, source, false);

         expect(target).toHaveProperty('own');
      },
   );

   it('should mutate the target in-place', () => {
      const target = { existing: true };
      assign(target, { added: true });

      expect(target).toEqual({ existing: true, added: true });
   });

   it('should work with arrays as targets', () => {
      const target: unknown[] = [1, 2];
      assign(target, { 0: 'a' });
      expect(target[0]).toBe('a');
   });

   it('should merge overrides onto ' + 'cloned objects', () => {
      const cloned = {
         start: 0,
         end: 10,
         next: null,
      };
      const overrides = {
         start: 5,
         next: 'ptr',
      };
      assign(cloned, overrides);
      expect(cloned.start).toBe(5);
      expect(cloned.end).toBe(10);
      expect(cloned.next).toBe('ptr');
   });

   it('should handle multiple sequential ' + 'assignments', () => {
      const target: Record<string, unknown> = {};
      assign(target, { a: 1 });
      assign(target, { b: 2 });
      assign(target, { c: 3 });
      expect(target).toEqual({ a: 1, b: 2, c: 3 });
   });

   it('should copy methods from source ' + 'to target', () => {
      const target: Record<string, unknown> = {};
      const source = {
         greet: () => 'hello',
      };
      assign(target, source);
      expect(typeof target.greet).toBe('function');
   });
});
