import {
  UsecaseSymbol
} from "./chunk-HLBWIRJA.mjs";
import {
  NAME_KEY,
  ROLES_KEY
} from "./chunk-U743HXLL.mjs";
import {
  ACTOR_TYPE
} from "./chunk-JYYYY7EP.mjs";

// src/actor/classes/actor.class.ts
import { get, set } from "@dikolab/private-parts";
var Actor = class extends UsecaseSymbol {
  get [ROLES_KEY]() {
    return get(this, ROLES_KEY);
  }
  constructor(name, roles) {
    super(ACTOR_TYPE, name);
    set(this, ROLES_KEY, roles);
  }
  toJSON() {
    const roles = this[ROLES_KEY].map((role) => role[NAME_KEY]);
    return {
      ...super.toJSON(),
      roles
    };
  }
};

export {
  Actor
};
//# sourceMappingURL=chunk-UNVUUG3R.mjs.map
