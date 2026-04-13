import { ObjectInstance } from '../types/utility.type';
import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';

export function clear<Instance extends object>(
   instance: ObjectInstance<Instance>,
): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clear(instance);
}
