import { ROLE_NAMES_KEY } from '../../utils/constants/symbol-keys.constant';

export interface RoleNamesDefined<
   RoleNames extends readonly [...string[]],
> {
   readonly [ROLE_NAMES_KEY]: RoleNames;
}
