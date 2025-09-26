import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant';
import {
   AnyPropertyName,
   InstanceValueMap,
} from '../types/utility.type';

export function createInstanceValueMap<
   PropertyName extends AnyPropertyName,
>(propertyName: PropertyName): InstanceValueMap {
   if (!ACCESSOR_KEY_MAP.has(propertyName)) {
      ACCESSOR_KEY_MAP.set(propertyName, new WeakMap());
   }

   return ACCESSOR_KEY_MAP.get(propertyName) as InstanceValueMap;
}
