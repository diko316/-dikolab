import { get, set } from '@dikolab/private-parts';
import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant.mjs';
import { TYPE_KEY, NAME_KEY, ID_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { createSymbolId } from '../functions/create-symbol-id.function.mjs';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';
import EventEmitter from 'events';

class UsecaseSymbol {
    get [TYPE_KEY]() {
        return get(this, TYPE_KEY);
    }
    get [NAME_KEY]() {
        return get(this, NAME_KEY);
    }
    get [ID_KEY]() {
        return get(this, ID_KEY);
    }
    get [EVENT_EMITTER_KEY]() {
        return get(this, EVENT_EMITTER_KEY);
    }
    constructor(type, name) {
        const id = createSymbolId(type, name);
        // symbols are unique
        if (SYMBOL_LOOKUP.has(id)) {
            throw new ReferenceError(`Symbol ${id} already exist.`);
        }
        set(this, EVENT_EMITTER_KEY, new EventEmitter({
            captureRejections: true,
        }));
        set(this, TYPE_KEY, type);
        set(this, NAME_KEY, name);
        set(this, ID_KEY, id);
        // register to symbol lookup
        SYMBOL_LOOKUP.set(id, this);
    }
    toString() {
        return this[ID_KEY];
    }
    toJSON() {
        return {
            type: this[TYPE_KEY],
            name: this[NAME_KEY],
        };
    }
}

export { UsecaseSymbol };
//# sourceMappingURL=usecase-symbol.class.mjs.map
