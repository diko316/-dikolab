import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';
import type { AnyPropertyName } from '../types/utility.type';

export function get(instance: object, propertyName: AnyPropertyName) {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(
      instance,
      propertyName,
   );
}
