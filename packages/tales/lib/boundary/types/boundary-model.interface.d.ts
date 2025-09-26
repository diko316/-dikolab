import { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';
import { SUBTYPE_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { BOUNDARY_TYPE } from '../../utils/constants/symbol-tag.constant';
export interface BoundaryModel<Type extends string, Title extends string> extends UsecaseSymbolModel<typeof BOUNDARY_TYPE, `${Type}:${Title}`> {
    readonly [SUBTYPE_KEY]: Type;
    readonly [TITLE_KEY]: Title;
}
