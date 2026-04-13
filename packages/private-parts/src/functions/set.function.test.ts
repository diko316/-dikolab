import { beforeEach, describe, expect, it } from 'vitest';
import { set } from './set.function';
import { get } from './get.function';
import { clearAll } from './clear-all.function';
import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';

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

   it('should set property value referenced by the instance.', () => {
      set(instance, propertyName, propertyValue);

      const result = GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(
         instance,
         propertyName,
      );

      expect(result).toBe(propertyValue);
      expect(get(instance, propertyName)).toBe(propertyValue);
   });
});
