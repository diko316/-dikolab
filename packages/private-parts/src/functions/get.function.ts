import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';
import type { AnyPropertyName } from '../types/utility.type';

/**
 * Retrieves a private property value from an
 * instance in the global store
 *
 * @param instance The object to read from
 * @param propertyName The private property key
 * @returns The stored value, or undefined
 */
export function get(instance: object, propertyName: AnyPropertyName) {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(
      instance,
      propertyName,
   );
}
