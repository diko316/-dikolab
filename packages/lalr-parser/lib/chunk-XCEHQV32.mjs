import {
  Lexeme
} from "./chunk-34NP2RHO.mjs";

// src/iterator/classes/base-iterator.class.ts
import { isString, isNumber } from "@dikolab/common";
var INVALID_STATE_HANDLER = "Invalid result from state handler";
var BaseIterator = class {
  parser;
  subject = "";
  returns = false;
  current = null;
  ready = false;
  completed = false;
  error = null;
  start = ":start";
  state = ":start";
  pstate = "";
  params = null;
  nextTokenIndex = 0;
  cursor = 0;
  buffer = [];
  actions = {
    ":start": {
      0: ":fail",
      1: ":tokenize"
    },
    ":tokenize": {
      0: ":fail",
      1: ":tokenize",
      2: ":shift",
      3: ":reduce"
    },
    ":shift": {
      0: ":fail",
      1: ":tokenize"
    },
    ":reduce": {
      0: ":fail",
      1: ":shift",
      2: ":reduce",
      3: ":success"
    },
    ":fail": {},
    ":success": {}
  };
  handlers;
  constructor(parser) {
    if (!parser) {
      throw new Error("Invalid parser parameter.");
    }
    this.parser = parser;
    this.handlers = {
      ":start": this.handleStart.bind(this),
      ":tokenize": this.handleTokenize.bind(this),
      ":shift": this.handleShift.bind(this),
      ":reduce": this.handleReduce.bind(this),
      ":success": this.handleSuccess.bind(this),
      ":fail": this.handleFail.bind(this)
    };
    this.reset();
    this.start = ":start";
  }
  handleStart() {
    this.params = this.nextTokenIndex;
    return 1;
  }
  handleTokenize(from) {
    const parser = this.parser;
    const map = parser.map;
    const ends = map.ends;
    const states = map.states;
    const state = this.pstate;
    const token = parser.tokenizer.tokenize(
      from,
      this.subject
    );
    const endToken = map.endToken;
    if (token) {
      let name = token[0];
      const to = token[2];
      if (!this.isAcceptableToken(token)) {
        this.params = to;
        return 1;
      }
      const lexeme = new Lexeme("terminal");
      let literal = name;
      if (name === endToken) {
        name = map.endSymbol;
      } else {
        literal = map.symbol[name];
      }
      const ref = states[state];
      lexeme.name = literal;
      lexeme.symbol = name;
      lexeme.value = token[1];
      lexeme.from = from;
      lexeme.to = to;
      lexeme.lookaheads = ref[">>"];
      this.nextTokenIndex = to;
      this.params = lexeme;
      if (name in ref) {
        return 2;
      }
    }
    if (this.buffer.length && state in ends) {
      return 3;
    }
    this.params = "Invalid token";
    return 0;
  }
  handleShift(param) {
    const lexeme = param;
    const buffer = this.buffer;
    const map = this.parser.map;
    const states = map.states;
    const state = this.pstate;
    const name = lexeme.symbol;
    buffer[buffer.length] = [state, lexeme];
    this.pstate = states[state][name];
    this.current = lexeme;
    this.params = null;
    this.returns = name !== map.endSymbol;
    this.params = this.nextTokenIndex;
    return 1;
  }
  handleReduce(param) {
    const lexeme = param;
    const map = this.parser.map;
    const buffer = this.buffer;
    let bl = buffer.length;
    const ends = map.ends;
    const states = map.states;
    const lookup = map.symbol;
    let state = this.pstate;
    const reduce = map.lookupReducer(ends[state]);
    if (!reduce) {
      this.params = "failed reduce lookup";
      return 0;
    }
    let name = reduce[0];
    const params = reduce[1];
    const ruleNumber = reduce[2];
    let l = params;
    const endIndex = l - 1;
    const created = new Lexeme("nonterminal");
    const values = [];
    const literal = lookup[name];
    let litem;
    let from = 0;
    let to = 0;
    let last = null;
    created.name = literal;
    created.symbol = name;
    created.rule = ruleNumber + ":" + literal;
    created.reduceArguments = params;
    created.reduceCount = params;
    for (; l--; ) {
      const item = buffer[--bl];
      state = item[0];
      litem = item[1];
      from = litem.from;
      if (l === endIndex) {
        to = litem.to;
      }
      litem.parent = created;
      if (last) {
        last.previous = litem;
        litem.next = last;
      } else {
        created.last = litem;
      }
      created.first = last = litem;
      values[l] = litem.value;
    }
    created.value = values;
    created.from = from;
    created.to = to;
    buffer.length = bl;
    this.current = created;
    if (name === map.augmentedRoot) {
      if (bl === 0) {
        litem = created.first;
        created.useType("end");
        created.last = litem;
        created.value = [litem.value];
        created.reduceCount = 1;
        this.params = created;
        return 3;
      } else {
        this.params = "Failed last reduce";
        return 0;
      }
    }
    buffer[bl++] = [state, created];
    this.returns = true;
    state = states[state][name];
    const ref = states[state];
    name = lexeme.symbol;
    this.pstate = state;
    if (name in ref) {
      return 1;
    } else if (state in ends) {
      return 2;
    }
    this.params = "failed reduce! inside :reduce";
    return 0;
  }
  handleSuccess(param) {
    const lexeme = param;
    this.completed = true;
    this.returns = true;
    this.current = lexeme;
    return false;
  }
  handleFail(error) {
    this.error = error;
    this.completed = true;
    return false;
  }
  isAcceptableToken(token) {
    return !(token[0] in this.parser.map.exclude);
  }
  /**
   * Updates the current lexeme value
   *
   * @param value - New value to set
   * @returns This iterator
   */
  update(value) {
    const current = this.current;
    if (!this.error && current) {
      current.value = value;
    }
    return this;
  }
  /**
   * Resets the iterator state for reuse
   *
   * @returns void
   */
  reset() {
    const parser = this.parser;
    this.nextTokenIndex = 0;
    this.cursor = 0;
    this.buffer = [];
    this.state = this.start;
    this.pstate = parser.map.start;
    this.params = null;
    if (!this.subject) {
      this.ready = false;
    }
    this.completed = false;
    this.error = null;
    this.returns = false;
    this.current = null;
  }
  /**
   * Sets the input string to parse
   *
   * @param subject - Input string
   * @returns void
   */
  set(subject) {
    if (!isString(subject)) {
      throw new Error("Invalid String subject parameter.");
    }
    this.reset();
    this.subject = subject;
    this.ready = true;
  }
  /**
   * Advances the parse and returns the
   * next lexeme, or null when complete,
   * or false on error
   *
   * @returns Lexeme, false, or null
   */
  next() {
    const actions = this.actions;
    const handlers = this.handlers;
    let completed = this.completed;
    let returns = false;
    if (!this.ready) {
      throw new Error(
        "Iterator is not yet ready, nothing to Parse."
      );
    }
    if (!completed) {
      this.current = null;
    }
    for (; !completed; ) {
      const state = this.state;
      const params = this.params;
      if (!(state in handlers)) {
        throw new Error("No handler found for state " + state);
      }
      const result = handlers[state](params);
      returns = this.returns;
      this.returns = false;
      const current = this.current;
      completed = this.completed;
      if (this.error) {
        break;
      }
      if (!completed) {
        if (!isNumber(result)) {
          throw new Error(INVALID_STATE_HANDLER + state);
        }
        const ref = actions[state];
        if (!(result in ref)) {
          throw new Error(INVALID_STATE_HANDLER + state);
        }
        this.state = ref[result];
      }
      if (returns) {
        return current;
      }
    }
    return this.error || !completed ? false : null;
  }
};

export {
  BaseIterator
};
//# sourceMappingURL=chunk-XCEHQV32.mjs.map
