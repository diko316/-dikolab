import { defineRole } from '../../actor/functions/define-role.function';
import { getSymbolById } from '../../symbol/functions/get-symbol-by-id.function';
import { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant';
import { ResolveRoles } from '../types/utility.type';

export function getOrDefineRoles<Names extends readonly string[]>(
   ...roleNames: Names
) {
   return roleNames.map((name) => {
      if (typeof name !== 'string') {
         throw new TypeError(
            `"${name}" in roleNames parameter is invalid.`,
         );
      }

      return getSymbolById(ROLE_TYPE, name) || defineRole(name);
   }) as ResolveRoles<Names>;
}
