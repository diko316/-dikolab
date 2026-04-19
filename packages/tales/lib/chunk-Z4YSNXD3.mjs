import {
  getOrDefineRoles
} from "./chunk-DDW32AO4.mjs";
import {
  Actor
} from "./chunk-UNVUUG3R.mjs";

// src/actor/functions/define-actor.function.ts
function defineActor(name, ...roleOrNames) {
  if (!name || typeof name !== "string") {
    throw new TypeError(`"${name}" name parameter is invald.`);
  }
  const [role] = getOrDefineRoles(name);
  const others = getOrDefineRoles(
    ...roleOrNames
  );
  const roles = [role, ...others];
  return new Actor(name, roles);
}

export {
  defineActor
};
//# sourceMappingURL=chunk-Z4YSNXD3.mjs.map
