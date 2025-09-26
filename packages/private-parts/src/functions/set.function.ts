import { AnyPropertyName, ObjectInstance } from '../types/utility.type';
import { createInstanceKeyset } from './create-instance-key-set.function';
import { createInstanceValueMap } from './create-instance-value-map.function';
import { getInstanceKeyset } from './get-instance-key-set.function';
import { getInstanceValueMap } from './get-instance-value-map.function';

export function set<
   Value,
   Instance extends object,
   PropertyName extends AnyPropertyName,
>(
   instance: ObjectInstance<Instance>,
   propertyName: PropertyName,
   value: Value,
): void {
   const repo =
      getInstanceValueMap(propertyName) ||
      createInstanceValueMap(propertyName);

   const keys =
      getInstanceKeyset(instance) || createInstanceKeyset(instance);

   // add keys if do not exist
   if (!keys.has(propertyName)) {
      keys.add(propertyName);
   }

   // set or replace value
   repo.set(instance, value);
}
