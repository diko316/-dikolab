import {
  getSymbolName
} from "./chunk-UG5NBXPT.mjs";
import {
  UsecaseSymbol
} from "./chunk-HLBWIRJA.mjs";
import {
  createUsecaseTitle
} from "./chunk-AYHS67CE.mjs";
import {
  BOUNDARY_KEY,
  GOAL_KEY,
  HANDLER_KEY,
  MOCK_HANDLER_KEY,
  ROLES_KEY,
  TITLE_KEY
} from "./chunk-U743HXLL.mjs";
import {
  USECASE_TYPE
} from "./chunk-JYYYY7EP.mjs";

// src/usecase/classes/usecase.class.ts
import { get, set } from "@dikolab/private-parts";
var Usecase = class extends UsecaseSymbol {
  get [TITLE_KEY]() {
    return get(this, TITLE_KEY);
  }
  get [ROLES_KEY]() {
    return get(this, ROLES_KEY);
  }
  get [GOAL_KEY]() {
    return get(this, GOAL_KEY);
  }
  get [HANDLER_KEY]() {
    return get(this, HANDLER_KEY);
  }
  get [MOCK_HANDLER_KEY]() {
    return get(this, MOCK_HANDLER_KEY);
  }
  set [MOCK_HANDLER_KEY](handler) {
    set(this, MOCK_HANDLER_KEY, handler);
  }
  get [BOUNDARY_KEY]() {
    return get(this[GOAL_KEY], BOUNDARY_KEY);
  }
  constructor(title, roles, goal, handler) {
    super(USECASE_TYPE, createUsecaseTitle(title, goal, ...roles));
    set(this, TITLE_KEY, title);
    set(this, ROLES_KEY, roles);
    set(this, HANDLER_KEY, handler);
    set(this, MOCK_HANDLER_KEY, null);
    set(this, GOAL_KEY, goal);
  }
  toString() {
    return getSymbolName(this);
  }
};

export {
  Usecase
};
//# sourceMappingURL=chunk-KZIG5SQB.mjs.map
