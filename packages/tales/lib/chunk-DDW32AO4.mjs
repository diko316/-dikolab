import {
  defineRole
} from "./chunk-TB43YAYM.mjs";
import {
  getSymbolById
} from "./chunk-5TRXQO5L.mjs";
import {
  ROLE_TYPE
} from "./chunk-JYYYY7EP.mjs";

// src/actor/functions/get-or-define-roles.function.ts
function getOrDefineRoles(...roleNames) {
  return roleNames.map((name) => {
    if (typeof name !== "string") {
      throw new TypeError(
        `"${String(name)}" in roleNames parameter is invalid.`
      );
    }
    return getSymbolById(ROLE_TYPE, name) || defineRole(name);
  });
}

export {
  getOrDefineRoles
};
//# sourceMappingURL=chunk-DDW32AO4.mjs.map
