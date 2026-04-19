import {
  defineActor
} from "./chunk-Z4YSNXD3.mjs";
import {
  TITLE_KEY
} from "./chunk-U743HXLL.mjs";

// src/definition/classes/iam-chain.class.ts
import { get, set } from "@dikolab/private-parts";
var IAmChain = class {
  get [TITLE_KEY]() {
    return get(this, TITLE_KEY);
  }
  constructor(actorName) {
    set(this, TITLE_KEY, actorName);
  }
  /**
   * Defines an Actor with the given Roles.
   *
   * @param roles Roles to attach
   * @returns Actor
   */
  as(...roles) {
    return defineActor(this[TITLE_KEY], ...roles);
  }
};

export {
  IAmChain
};
//# sourceMappingURL=chunk-MQM7NSJ4.mjs.map
