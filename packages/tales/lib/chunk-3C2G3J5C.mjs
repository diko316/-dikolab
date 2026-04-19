import {
  intersectRoles
} from "./chunk-M4EKON62.mjs";
import {
  ROLES_KEY
} from "./chunk-U743HXLL.mjs";

// src/usecase/functions/is-actor-allow-to-perform.function.ts
function isActorAllowToPerform(actor, roles) {
  return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}

export {
  isActorAllowToPerform
};
//# sourceMappingURL=chunk-3C2G3J5C.mjs.map
