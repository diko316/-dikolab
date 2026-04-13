import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant.mjs';

function get(instance, propertyName) {
    return GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(instance, propertyName);
}

export { get };
//# sourceMappingURL=get.function.mjs.map
