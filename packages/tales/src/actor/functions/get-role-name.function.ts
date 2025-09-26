import { get } from '@dikolab/private-parts';
import { AnyRole, RoleName } from '../types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';

export function getRoleName<Role extends AnyRole>(
   role: Role,
): RoleName<Role> {
   return get(role, NAME_KEY);
}
