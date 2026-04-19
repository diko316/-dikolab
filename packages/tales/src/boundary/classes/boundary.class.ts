import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import {
   SUBTYPE_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';

import { BOUNDARY_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { BoundaryModel } from '../types/boundary-model.interface';

export class Boundary<Type extends string, Title extends string>
   extends UsecaseSymbol<typeof BOUNDARY_TYPE, `${Type}:${Title}`>
   implements BoundaryModel<Type, Title>
{
   get [SUBTYPE_KEY](): Type {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, SUBTYPE_KEY);
   }

   get [TITLE_KEY](): Title {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, TITLE_KEY);
   }

   constructor(type: Type, title: Title) {
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
