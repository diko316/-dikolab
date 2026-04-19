import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';
import type { AnyPropertyName } from '../types/utility.type';

export function set(
   instance: object,
   propertyName: AnyPropertyName,
   value: unknown,
): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.set(
      instance,
      propertyName,
      value,
   );
}
