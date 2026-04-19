import {
  UsecaseSymbol
} from "./chunk-EWQ7NUHG.mjs";
import {
  SUBTYPE_KEY,
  TITLE_KEY
} from "./chunk-U743HXLL.mjs";
import {
  BOUNDARY_TYPE
} from "./chunk-JYYYY7EP.mjs";

// src/boundary/classes/boundary.class.ts
import { get, set } from "@dikolab/private-parts";
var Boundary = class extends UsecaseSymbol {
  get [SUBTYPE_KEY]() {
    return get(this, SUBTYPE_KEY);
  }
  get [TITLE_KEY]() {
    return get(this, TITLE_KEY);
  }
  constructor(type, title) {
    super(BOUNDARY_TYPE, `${type}:${title}`);
    set(this, SUBTYPE_KEY, type);
    set(this, TITLE_KEY, title);
  }
  /** Returns a plain object with type, name, and subtype */
  toJSON() {
    return {
      ...super.toJSON(),
      subtype: this[SUBTYPE_KEY]
    };
  }
};

export {
  Boundary
};
//# sourceMappingURL=chunk-LOHGETNH.mjs.map
