import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';
import { AnyPropertyName, ObjectInstance } from '../types/utility.type';

export function get<
   Instance extends object,
   PropertyName extends AnyPropertyName,
>(instance: ObjectInstance<Instance>, propertyName: PropertyName) {
   return GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(
      instance,
      propertyName,
   );
}
