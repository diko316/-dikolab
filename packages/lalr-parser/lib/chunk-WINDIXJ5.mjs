import {
  defaultIterator,
  getIterator
} from "./chunk-XW6B7ASB.mjs";
import {
  build
} from "./chunk-5ZD3LJ4H.mjs";
import {
  StateMap
} from "./chunk-VWKFMB3W.mjs";

// src/parser/classes/parser.class.ts
import { isString, isObject, isArray } from "@dikolab/common";
import { Tokenizer } from "@dikolab/tokenizer";
var debugMode = false;
var Parser = class {
  tokenizer;
  map;
  ready = false;
  constructor(root, definition, exclude) {
    this.tokenizer = new Tokenizer();
    this.map = new StateMap(debugMode);
    if (arguments.length) {
      this.define(root, definition, exclude);
    }
  }
  /**
   * Defines grammar rules for parsing
   *
   * @param root - Root grammar rule name
   * @param definition - Grammar definitions
   * @param exclude - Token patterns to skip
   * @returns true if grammar is valid
   */
  define(root, definition, exclude) {
    if (!isString(root)) {
      throw new Error("Invalid root grammar rule parameter.");
    }
    if (!isArray(definition)) {
      throw new Error(
        "Invalid grammar rules definition parameter"
      );
    }
    if (!isArray(exclude)) {
      exclude = [];
    }
    const ready = build(
      root,
      this.map,
      this.tokenizer,
      definition,
      exclude
    );
    this.ready = ready;
    return ready;
  }
  /**
   * Creates an iterator for this parser
   *
   * @param name - Optional named iterator
   * @returns New iterator instance
   */
  iterator(name) {
    let IteratorClass;
    if (name !== void 0) {
      IteratorClass = getIterator(name);
      if (!IteratorClass) {
        throw new Error("Invalid iterator name parameter.");
      }
    } else {
      IteratorClass = getIterator(defaultIterator);
    }
    return new IteratorClass(this);
  }
  /**
   * Imports parser state from JSON
   *
   * @param json - JSON string or object
   * @returns This parser instance
   */
  fromJSON(json) {
    if (isString(json)) {
      try {
        json = JSON.parse(json);
      } catch (_e) {
        throw new Error("Invalid JSON String json parameter.");
      }
    }
    if (!isObject(json)) {
      throw new Error("Invalid Object json parameter.");
    }
    const data = json;
    const tokenMap = data.tokens;
    if (!isObject(tokenMap)) {
      throw new Error(
        'Invalid "tokens" property of json parameter.'
      );
    }
    this.tokenizer.fromJSON(
      tokenMap
    );
    this.map.importStates(data);
    this.ready = true;
    return this;
  }
  /**
   * Exports parser state as JSON string
   *
   * @returns JSON string
   */
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  /**
   * Exports parser state as plain object
   *
   * @returns State map data with tokens
   */
  toObject() {
    if (!this.ready) {
      throw new Error("Grammar rules is not yet defined.");
    }
    const obj = this.map.toObject();
    obj.tokens = this.tokenizer.toObject();
    return obj;
  }
  /**
   * Parses a string subject using the
   * defined grammar
   *
   * @param subject - Input string to parse
   * @param reducer - Optional callbacks
   * @param iteratorName - Optional iterator
   * @returns Array of lexemes or false
   */
  parse(subject, reducer, iteratorName) {
    const rpn = [];
    let rl = 0;
    if (!isString(subject)) {
      throw new Error("Invalid string subject parameter");
    }
    const iter = isString(iteratorName) ? this.iterator(iteratorName) : this.iterator();
    if (!iter) {
      throw new Error("Invalid Iterator parameter.");
    }
    if (!isObject(reducer)) {
      reducer = {};
    }
    iter.set(subject);
    for (let lexeme = iter.next(); lexeme; lexeme = iter.next()) {
      rpn[rl++] = lexeme;
      const lex = lexeme;
      const name = lex.name;
      if (name in reducer) {
        const value = reducer[name](name, lex.value, lex);
        if (typeof value !== "undefined") {
          lex.value = value;
        } else if (lex.params !== 0) {
          lex.value = null;
        }
      }
    }
    return iter.error ? false : rpn;
  }
};
function debug(isDebugMode) {
  debugMode = isDebugMode !== false;
}

export {
  Parser,
  debug
};
//# sourceMappingURL=chunk-WINDIXJ5.mjs.map
