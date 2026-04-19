import type { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';
import type { NAME_KEY } from '../../utils/constants/symbol-keys.constant';
import type { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant';
export interface RoleModel<Name extends string> extends UsecaseSymbolModel<typeof ROLE_TYPE, Name> {
    readonly [NAME_KEY]: Name;
}
