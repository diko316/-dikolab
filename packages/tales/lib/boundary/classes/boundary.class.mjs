import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class.mjs';
import { SUBTYPE_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { BOUNDARY_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';

class Boundary extends UsecaseSymbol {
    get [SUBTYPE_KEY]() {
        return get(this, SUBTYPE_KEY);
    }
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    constructor(type, title) {
        super(BOUNDARY_TYPE, `${type}:${title}`);
        set(this, SUBTYPE_KEY, type);
        set(this, TITLE_KEY, title);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            subtype: this[SUBTYPE_KEY],
        };
    }
}

export { Boundary };
//# sourceMappingURL=boundary.class.mjs.map
