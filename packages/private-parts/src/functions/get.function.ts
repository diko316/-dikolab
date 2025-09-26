import { AnyPropertyName, ObjectInstance } from '../types/utility.type';
import { getInstanceValueMap } from './get-instance-value-map.function';

export function get<
   Instance extends object,
   PropertyName extends AnyPropertyName,
>(instance: ObjectInstance<Instance>, propertyName: PropertyName) {
   const repo = getInstanceValueMap(propertyName);

   if (!repo) {
      return undefined;
   }

   return repo.get(instance);
}
