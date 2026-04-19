import {
  AsChain
} from "./chunk-N34DQKY7.mjs";
import {
  Role
} from "./chunk-DYBULGB5.mjs";
import {
  defineGoal
} from "./chunk-TYQTVGMC.mjs";
import {
  BOUNDARY_KEY,
  NAME_KEY
} from "./chunk-U743HXLL.mjs";

// src/definition/classes/scope.class.ts
import { get, set } from "@dikolab/private-parts";
var Scope = class {
  get [BOUNDARY_KEY]() {
    return get(this, BOUNDARY_KEY);
  }
  constructor(boundary) {
    set(this, BOUNDARY_KEY, boundary);
  }
  /**
   * Creates Goal to be used for declaring a Use-case
   *
   * @param title Unique goal title of what you want to achieve.
   * @returns Goal
   */
  defineGoal(title) {
    return defineGoal(title, this[BOUNDARY_KEY]);
  }
  /**
   * Creates declaration of Roles that guards the Use-case execution
   *
   * @param roles Role names or Roles included in the context
   * @returns declaration chain object
   */
  as(...roles) {
    const roleNames = roles.map((roleOrName) => {
      if (typeof roleOrName === "string") {
        return roleOrName;
      }
      if (roleOrName instanceof Role) {
        return roleOrName[NAME_KEY];
      }
      throw new TypeError("Role parameter is invalid.");
    });
    return new AsChain(this[BOUNDARY_KEY], roleNames);
  }
};

export {
  Scope
};
//# sourceMappingURL=chunk-SP2WHBVZ.mjs.map
