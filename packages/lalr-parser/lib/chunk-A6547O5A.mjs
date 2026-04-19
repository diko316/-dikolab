// src/state/define/classes/item-pointer.class.ts
import { isArray } from "@dikolab/common";
var ItemPointer = class {
  item;
  ruleIds;
  to;
  next = null;
  constructor(lexeme, state, ruleId) {
    this.item = lexeme;
    this.ruleIds = isArray(ruleId) ? ruleId : [ruleId];
    this.to = state;
  }
};

export {
  ItemPointer
};
//# sourceMappingURL=chunk-A6547O5A.mjs.map
