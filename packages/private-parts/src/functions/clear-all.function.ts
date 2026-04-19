import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';

/**
 * Clears all private data from every instance
 * in the global store
 */
export function clearAll(): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clearAll();
}
