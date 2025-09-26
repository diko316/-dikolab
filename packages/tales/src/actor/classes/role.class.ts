import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant';
import { RoleModel } from '../types/role-model.interface';

export class Role<Name extends string>
   extends UsecaseSymbol<typeof ROLE_TYPE, Name>
   implements RoleModel<Name>
{
   constructor(name: Name) {
      super(ROLE_TYPE, name);
   }
}
