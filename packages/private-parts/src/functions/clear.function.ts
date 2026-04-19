import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';

export function clear(instance: object): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clear(instance);
}
