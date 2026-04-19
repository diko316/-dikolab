import { get } from '@dikolab/private-parts';
import type { AnyRole, RoleName } from '../types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';

export function getRoleName<Role extends AnyRole>(
   role: Role,
): RoleName<Role> {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return get(role, NAME_KEY);
}
