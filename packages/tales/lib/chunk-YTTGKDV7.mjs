import {
  createGoalName
} from "./chunk-FA3DEVSB.mjs";
import {
  UsecaseSymbol
} from "./chunk-HLBWIRJA.mjs";
import {
  BOUNDARY_KEY,
  TITLE_KEY
} from "./chunk-U743HXLL.mjs";
import {
  GOAL_TYPE
} from "./chunk-JYYYY7EP.mjs";

// src/goal/classes/goal.class.ts
import { get, set } from "@dikolab/private-parts";
var Goal = class extends UsecaseSymbol {
  get [TITLE_KEY]() {
    return get(this, TITLE_KEY);
  }
  get [BOUNDARY_KEY]() {
    return get(this, BOUNDARY_KEY);
  }
  constructor(title, boundary) {
    super(GOAL_TYPE, createGoalName(title, boundary));
    set(this, TITLE_KEY, title);
    set(this, BOUNDARY_KEY, boundary);
  }
};

export {
  Goal
};
//# sourceMappingURL=chunk-YTTGKDV7.mjs.map
