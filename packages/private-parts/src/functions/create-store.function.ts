import { ContextualPrivatePartManager } from '../classes/contextual-private-parts-manager.class';

/**
 * Creates an isolated private data store,
 * independent from the global store
 *
 * @returns A new ContextualPrivatePartManager
 */
export function createStore(): ContextualPrivatePartManager {
   return new ContextualPrivatePartManager();
}
