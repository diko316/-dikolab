import { describe, it, expect } from 'vitest';
import { clone } from './clone.function';

describe('clone', () => {
   describe('shallow clone', () => {
      it('should shallow clone an object', () => {
         const obj = { a: 1, b: { c: 2 } };
         const cloned = clone(obj);

         expect(cloned).toEqual(obj);
         expect(cloned).not.toBe(obj);
         expect(cloned.b).toBe(obj.b);
      });

      it('should shallow clone an array', () => {
         const arr = [1, [2, 3], 4];
         const cloned = clone(arr);

         expect(cloned).toEqual(arr);
         expect(cloned).not.toBe(arr);
         expect(cloned[1]).toBe(arr[1]);
      });

      it('should clone a RegExp', () => {
         const re = /test/gi;
         const cloned = clone(re);

         expect(cloned).toBeInstanceOf(RegExp);
         expect(cloned.source).toBe('test');
         expect(cloned.flags).toContain('g');
         expect(cloned.flags).toContain('i');
         expect(cloned).not.toBe(re);
      });

      it('should clone a Date', () => {
         const date = new Date(2024, 5, 15);
         const cloned = clone(date);

         expect(cloned).toBeInstanceOf(Date);
         expect(cloned.getTime()).toBe(date.getTime());
         expect(cloned).not.toBe(date);
      });

      it('should return primitives as-is', () => {
         expect(clone(42)).toBe(42);
         expect(clone('hello')).toBe('hello');
         expect(clone(true)).toBe(true);
         expect(clone(null)).toBeNull();
         expect(clone(undefined)).toBeUndefined();
      });
   });

   describe('deep clone', () => {
      it('should deep clone nested objects', () => {
         const obj = {
            a: { b: { c: 1 } },
            d: [1, 2],
         };
         const cloned = clone(obj, true);

         expect(cloned).toEqual(obj);
         expect(cloned).not.toBe(obj);
         expect(cloned.a).not.toBe(obj.a);
         expect(cloned.a.b).not.toBe(obj.a.b);
         expect(cloned.d).not.toBe(obj.d);
      });

      it('should deep clone nested arrays', () => {
         const arr = [
            [1, 2],
            [3, [4, 5]],
         ];
         const cloned = clone(arr, true);

         expect(cloned).toEqual(arr);
         expect(cloned).not.toBe(arr);
         expect(cloned[0]).not.toBe(arr[0]);
         expect(cloned[1]).not.toBe(arr[1]);
         expect(cloned[1][1]).not.toBe(arr[1][1]);
      });

      it('should handle circular references ' + 'in objects', () => {
         const obj: Record<string, unknown> = {
            a: 1,
         };
         obj.self = obj;
         const cloned = clone(obj, true);

         expect(cloned.a).toBe(1);
         expect(cloned.self).toBe(cloned);
         expect(cloned).not.toBe(obj);
      });

      it('should handle circular references ' + 'in arrays', () => {
         const arr: unknown[] = [1, 2];
         arr.push(arr);
         const cloned = clone(arr, true);

         expect(cloned[0]).toBe(1);
         expect(cloned[1]).toBe(2);
         expect(cloned[2]).toBe(cloned);
         expect(cloned).not.toBe(arr);
      });

      it('should deep clone mixed structures', () => {
         const obj = {
            list: [{ name: 'a' }, { name: 'b' }],
            nested: { arr: [1, 2, 3] },
         };
         const cloned = clone(obj, true);

         expect(cloned).toEqual(obj);
         expect(cloned.list[0]).not.toBe(obj.list[0]);
         expect(cloned.nested.arr).not.toBe(obj.nested.arr);
      });
   });

   it('should handle empty objects', () => {
      const result = clone({});
      expect(result).toEqual({});
   });

   it('should handle empty arrays', () => {
      const result = clone([]);
      expect(result).toEqual([]);
   });
});
