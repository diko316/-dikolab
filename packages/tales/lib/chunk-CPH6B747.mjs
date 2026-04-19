import {
  getOrDefineRoles
} from "./chunk-DDW32AO4.mjs";
import {
  defineUsecase
} from "./chunk-7ZFDOSR7.mjs";
import {
  BOUNDARY_KEY,
  GOAL_KEY,
  ROLE_NAMES_KEY,
  TITLE_KEY
} from "./chunk-U743HXLL.mjs";

// src/definition/classes/as-i-can-so-that-chain.class.ts
import { get, set } from "@dikolab/private-parts";
var AsICanSoThatChain = class {
  // InBoundary
  get [BOUNDARY_KEY]() {
    return get(this, BOUNDARY_KEY);
  }
  get [ROLE_NAMES_KEY]() {
    return get(this, ROLE_NAMES_KEY);
  }
  get [TITLE_KEY]() {
    return get(this, TITLE_KEY);
  }
  get [GOAL_KEY]() {
    return get(this, GOAL_KEY);
  }
  constructor(boundary, roleNames, title, goal) {
    set(this, BOUNDARY_KEY, boundary);
    set(this, ROLE_NAMES_KEY, roleNames);
    set(this, TITLE_KEY, title);
    set(this, GOAL_KEY, goal);
  }
  /**
   * Attaches handler function to be executed when Use-case is performed.
   *
   * @param handler Use-case execution handler function.
   * @returns Usecase
   */
  implementedAs(handler) {
    const roles = getOrDefineRoles(
      ...this[ROLE_NAMES_KEY]
    );
    const title = this[TITLE_KEY];
    const goal = this[GOAL_KEY];
    return defineUsecase(title, roles, goal, handler);
  }
};

export {
  AsICanSoThatChain
};
//# sourceMappingURL=chunk-CPH6B747.mjs.map
