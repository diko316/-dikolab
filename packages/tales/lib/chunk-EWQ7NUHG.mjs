import {
  createSymbolId
} from "./chunk-IU7WS2GT.mjs";
import {
  SYMBOL_LOOKUP
} from "./chunk-EHWJHZXL.mjs";
import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";
import {
  ID_KEY,
  NAME_KEY,
  TYPE_KEY
} from "./chunk-U743HXLL.mjs";

// src/symbol/classes/usecase-symbol.class.ts
import { get, set } from "@dikolab/private-parts";
import EventEmitter from "events";
var UsecaseSymbol = class {
  get [TYPE_KEY]() {
    return get(this, TYPE_KEY);
  }
  get [NAME_KEY]() {
    return get(this, NAME_KEY);
  }
  get [ID_KEY]() {
    return get(this, ID_KEY);
  }
  get [EVENT_EMITTER_KEY]() {
    return get(this, EVENT_EMITTER_KEY);
  }
  constructor(type, name) {
    const id = createSymbolId(type, name);
    if (SYMBOL_LOOKUP.has(id)) {
      throw new ReferenceError(`Symbol ${id} already exist.`);
    }
    set(
      this,
      EVENT_EMITTER_KEY,
      new EventEmitter({
        captureRejections: true
      })
    );
    set(this, TYPE_KEY, type);
    set(this, NAME_KEY, name);
    set(this, ID_KEY, id);
    SYMBOL_LOOKUP.set(id, this);
  }
  /** Returns the symbol's unique identifier */
  toString() {
    return this[ID_KEY];
  }
  /** Returns a plain object with type and name */
  toJSON() {
    return {
      type: this[TYPE_KEY],
      name: this[NAME_KEY]
    };
  }
};

export {
  UsecaseSymbol
};
//# sourceMappingURL=chunk-EWQ7NUHG.mjs.map
