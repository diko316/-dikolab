import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant';
import {
   AnyPropertyName,
   InstanceValueMap,
} from '../types/utility.type';

export function getInstanceValueMap<
   PropertyName extends AnyPropertyName,
>(propertyName: PropertyName): InstanceValueMap | null {
   return ACCESSOR_KEY_MAP.get(propertyName) || null;
}
