import { describe, it, expect } from 'vitest';
import { Registry, createRegistry } from './registry.class';

describe('Registry', () => {
   describe('constructor', () => {
      it('should create an instance with ' + 'empty data', () => {
         const reg = new Registry();
         expect(reg.data).toEqual({});
      });
   });

   describe('set()', () => {
      it('should set a value by string name', () => {
         const reg = new Registry();
         const result = reg.set('key', 'value');
         expect(result).toBe(reg);
         expect(reg.get('key')).toBe('value');
      });

      it('should set a value by numeric name', () => {
         const reg = new Registry();
         reg.set(0, 'zero');
         expect(reg.get(0)).toBe('zero');
      });

      it('should merge an object into data', () => {
         const reg = new Registry();
         reg.set({ a: 1, b: 2 });
         expect(reg.get('a')).toBe(1);
         expect(reg.get('b')).toBe(2);
      });

      it('should throw on invalid name', () => {
         const reg = new Registry();
         expect(() => reg.set(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });
   });

   describe('get()', () => {
      it('should return undefined for ' + 'missing keys', () => {
         const reg = new Registry();
         expect(reg.get('nonexistent')).toBeUndefined();
      });

      it('should return the stored value', () => {
         const reg = new Registry();
         reg.set('foo', 42);
         expect(reg.get('foo')).toBe(42);
      });

      it('should throw on invalid name', () => {
         const reg = new Registry();
         expect(() => reg.get(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });
   });

   describe('exists()', () => {
      it('should return true when key exists', () => {
         const reg = new Registry();
         reg.set('x', 10);
         expect(reg.exists('x')).toBe(true);
      });

      it('should return false when key ' + 'does not exist', () => {
         const reg = new Registry();
         expect(reg.exists('missing')).toBe(false);
      });

      it('should throw on invalid name', () => {
         const reg = new Registry();
         expect(() => reg.exists(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });
   });

   describe('unset()', () => {
      it('should remove an existing key', () => {
         const reg = new Registry();
         reg.set('a', 1);
         const result = reg.unset('a');
         expect(result).toBe(reg);
         expect(reg.exists('a')).toBe(false);
      });

      it(
         'should not throw when unsetting ' + 'a non-existent key',
         () => {
            const reg = new Registry();
            expect(() => reg.unset('nope')).not.toThrow();
         },
      );

      it('should throw on invalid name', () => {
         const reg = new Registry();
         expect(() => reg.unset(null as never)).toThrow(
            'Invalid [name] parameter.',
         );
      });
   });

   describe('clear()', () => {
      it('should remove all entries', () => {
         const reg = new Registry();
         reg.set('a', 1);
         reg.set('b', 2);
         const result = reg.clear();
         expect(result).toBe(reg);
         expect(reg.exists('a')).toBe(false);
         expect(reg.exists('b')).toBe(false);
      });
   });

   describe('clone()', () => {
      it('should return a deep clone of data', () => {
         const reg = new Registry();
         reg.set('nested', { x: { y: 1 } });
         const cloned = reg.clone();
         expect(cloned).toEqual({
            nested: { x: { y: 1 } },
         });
         expect(cloned).not.toBe(reg.data);
         expect(cloned.nested).not.toBe(reg.data.nested);
      });
   });

   describe('assign()', () => {
      it('should merge an object into data', () => {
         const reg = new Registry();
         reg.set('a', 1);
         const result = reg.assign({ b: 2 });
         expect(result).toBe(reg);
         expect(reg.get('a')).toBe(1);
         expect(reg.get('b')).toBe(2);
      });

      it('should throw on invalid value', () => {
         const reg = new Registry();
         expect(() => reg.assign(42 as never)).toThrow(
            'Invalid [value] parameter',
         );
      });
   });

   describe('find() / insert() / remove()', () => {
      it('should insert and find by ' + 'JSON path', () => {
         const reg = new Registry();
         reg.insert('a.b.c', 'deep');
         expect(reg.find('a.b.c')).toBe('deep');
      });

      it('should remove by JSON path', () => {
         const reg = new Registry();
         reg.insert('x.y', 100);
         expect(reg.find('x.y')).toBe(100);
         reg.remove('x.y');
         expect(reg.find('x.y')).toBeUndefined();
      });

      it('should throw on invalid path ' + 'for find', () => {
         const reg = new Registry();
         expect(() => reg.find(123 as never)).toThrow(
            'Invalid [path] parameter.',
         );
      });

      it('should throw on invalid path ' + 'for insert', () => {
         const reg = new Registry();
         expect(() => reg.insert(null as never, 1)).toThrow(
            'Invalid [path] parameter.',
         );
      });

      it('should throw on invalid path ' + 'for remove', () => {
         const reg = new Registry();
         expect(() => reg.remove(null as never)).toThrow(
            'Invalid [path] parameter.',
         );
      });
   });

   describe('pathExists()', () => {
      it('should return true for existing path', () => {
         const reg = new Registry();
         reg.insert('a.b', 'val');
         expect(reg.pathExists('a.b')).toBe(true);
      });

      it('should return false for missing path', () => {
         const reg = new Registry();
         expect(reg.pathExists('x.y.z')).toBe(false);
      });

      it('should throw on invalid path', () => {
         const reg = new Registry();
         expect(() => reg.pathExists(null as never)).toThrow(
            'Invalid [path] parameter.',
         );
      });
   });
});

describe('createRegistry()', () => {
   it('should return a Registry instance', () => {
      const reg = createRegistry();
      expect(reg).toBeInstanceOf(Registry);
   });

   it('should return a new instance each call', () => {
      const a = createRegistry();
      const b = createRegistry();
      expect(a).not.toBe(b);
   });

   it('should support symbol registry ' + 'pattern from joqx', () => {
      const reg = createRegistry();
      class Base {}
      class ChildA extends Base {}
      class ChildB extends Base {}

      reg.set('identifier', ChildA);
      reg.set('number', ChildB);

      expect(reg.exists('identifier')).toBe(true);
      expect(reg.get('identifier')).toBe(ChildA);
      expect(reg.exists('unknown')).toBe(false);
   });

   it('should support configuration ' + 'registry pattern', () => {
      const config = createRegistry();
      config.assign({ debug: false });

      expect(config.get('debug')).toBe(false);

      config.set('debug', true);
      expect(config.get('debug')).toBe(true);
   });

   it('should support intent/transformer ' + 'registry pattern', () => {
      const reg = createRegistry();
      const handler = () => 'result';

      reg.set('myIntent', handler);

      expect(reg.exists('myIntent')).toBe(true);
      const fn = reg.get('myIntent');
      expect(typeof fn).toBe('function');
   });

   it('should support chaining ' + 'multiple operations', () => {
      const reg = createRegistry();
      const result = reg.set('a', 1).set('b', 2).set('c', 3);
      expect(result).toBe(reg);
      expect(reg.get('a')).toBe(1);
      expect(reg.get('b')).toBe(2);
      expect(reg.get('c')).toBe(3);
   });

   it('should support prefixed key ' + 'namespacing pattern', () => {
      const reg = createRegistry();
      reg.set(':default', 'DefaultIterator');
      reg.set(':lalr', 'LalrIterator');

      expect(reg.exists(':default')).toBe(true);
      expect(reg.get(':lalr')).toBe('LalrIterator');
      expect(reg.exists(':unknown')).toBe(false);
   });
});
