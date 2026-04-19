import {
  AsICanChain
} from "./chunk-GQJX4CU3.mjs";
import {
  BOUNDARY_KEY,
  ROLE_NAMES_KEY
} from "./chunk-U743HXLL.mjs";

// src/definition/classes/as-chain.class.ts
import { get, set } from "@dikolab/private-parts";
var AsChain = class {
  get [BOUNDARY_KEY]() {
    return get(this, BOUNDARY_KEY);
  }
  get [ROLE_NAMES_KEY]() {
    return get(this, ROLE_NAMES_KEY);
  }
  constructor(boundary, roleNames) {
    set(this, BOUNDARY_KEY, boundary);
    set(this, ROLE_NAMES_KEY, roleNames);
  }
  /**
   * Declares text title of the Use-case.
   *
   * @param title Text title of the Use-case
   * @returns declaration chain
   */
  iCan(title) {
    return new AsICanChain(
      this[BOUNDARY_KEY],
      this[ROLE_NAMES_KEY],
      title
    );
  }
};

export {
  AsChain
};
//# sourceMappingURL=chunk-N34DQKY7.mjs.map
