import type { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';
import type {
   SUBTYPE_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import type { BOUNDARY_TYPE } from '../../utils/constants/symbol-tag.constant';

export interface BoundaryModel<
   Type extends string,
   Title extends string,
> extends UsecaseSymbolModel<typeof BOUNDARY_TYPE, `${Type}:${Title}`> {
   readonly [SUBTYPE_KEY]: Type;

   readonly [TITLE_KEY]: Title;
}
