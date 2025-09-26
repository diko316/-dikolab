import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant.mjs';
import { createSymbolId } from './create-symbol-id.function.mjs';

function getSymbolById(typeOrId, name) {
    const fullId = typeof name === 'string'
        ? createSymbolId(typeOrId, name)
        : createSymbolId(typeOrId);
    if (SYMBOL_LOOKUP.has(fullId)) {
        return SYMBOL_LOOKUP.get(fullId);
    }
    return null;
}

export { getSymbolById };
//# sourceMappingURL=get-symbol-by-id.function.mjs.map
