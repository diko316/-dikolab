import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';

/**
 * Clears all private data associated with an
 * instance from the global store
 *
 * @param instance The object whose private
 *    data should be removed
 */
export function clear(instance: object): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clear(instance);
}
