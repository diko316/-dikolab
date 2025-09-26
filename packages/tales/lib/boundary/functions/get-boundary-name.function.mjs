import { get } from '@dikolab/private-parts';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function getBoundaryName(boundary) {
    return get(boundary, NAME_KEY);
}

export { getBoundaryName };
//# sourceMappingURL=get-boundary-name.function.mjs.map
