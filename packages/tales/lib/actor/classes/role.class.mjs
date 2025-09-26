import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class.mjs';
import { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';

class Role extends UsecaseSymbol {
    constructor(name) {
        super(ROLE_TYPE, name);
    }
}

export { Role };
//# sourceMappingURL=role.class.mjs.map
