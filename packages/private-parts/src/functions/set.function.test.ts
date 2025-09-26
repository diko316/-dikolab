import { beforeEach, describe, expect, it } from 'vitest';
import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant';
import { set } from './set.function';
import { get } from './get.function';
import { clearAll } from './clear-all.function';

describe('set(instance: Instance, propertyName: PropertyName, value: any)', () => {
   interface Sample {
      readonly name: string;
   }

   const propertyName = 'type';
   const propertyValue = 1;

   let Class: new () => Sample;
   let instance: Sample;

   beforeEach(() => {
      // clear all maps
      clearAll();

      Class = class {
         readonly name = 'test name';
      };

      instance = new Class();
   });

   it('should create internal weakmap if not yet created.', () => {
      const before = ACCESSOR_KEY_MAP.get(propertyName);

      expect(before).toBeUndefined();

      set(instance, propertyName, propertyValue);

      const now = ACCESSOR_KEY_MAP.get(propertyName);

      expect(now).toBeDefined();
   });

   it('should set property value referenced by the instance.', () => {
      set(instance, propertyName, propertyValue);

      const weakmap = ACCESSOR_KEY_MAP.get(propertyName);
      const result = weakmap?.get(instance);

      expect(weakmap).toBeDefined();
      expect(result).toBe(propertyValue);
      expect(get(instance, propertyName)).toBe(propertyValue);
   });
});
