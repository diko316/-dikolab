import {
  LEXEME_TYPE
} from "./chunk-2ZCTGLDS.mjs";

// src/lexeme/classes/lexeme.class.ts
import { contains } from "@dikolab/common";
var Lexeme = class {
  name = null;
  rule = null;
  value = null;
  reduceArguments = 0;
  reduceCount = 0;
  from = 0;
  to = 0;
  parent = null;
  first = null;
  last = null;
  next = null;
  previous = null;
  terminal = false;
  type = 1;
  symbol;
  lookaheads;
  params;
  constructor(type) {
    this.terminal = false;
    this.useType(type);
  }
  /**
   * Sets the lexeme type code
   *
   * @param type - Type name key
   * @returns void
   */
  useType(type) {
    const types = LEXEME_TYPE;
    this.type = contains(types, type) ? types[type] : types.token;
    if (this.type === LEXEME_TYPE.terminal) {
      this.terminal = true;
    }
  }
};

export {
  Lexeme
};
//# sourceMappingURL=chunk-34NP2RHO.mjs.map
