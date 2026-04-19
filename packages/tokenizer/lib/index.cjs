var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Tokenizer: () => Tokenizer
});
module.exports = __toCommonJS(index_exports);

// src/tokenizer/classes/tokenizer.class.ts
var import_common3 = require("@dikolab/common");

// src/regex/classes/state-map.class.ts
var import_common = require("@dikolab/common");
var StateMap = class {
  priority = [];
  stateGenId = 0;
  start;
  states;
  ends = {};
  constructor(start) {
    this.start = typeof start === "string" ? start : "start";
    this.states = {
      [this.start]: { not: [] }
    };
  }
  generateState(id) {
    if ((0, import_common.isString)(id)) {
      return id;
    }
    return "s" + ++this.stateGenId;
  }
  /**
   * BFS-flattens NFA fragments into the
   * deterministic state table, mapping
   * fragment IDs to named states.
   */
  finalizeFragments(name, fragment, endStates) {
    const states = this.states;
    const ends = this.ends;
    const processed = {};
    const idmap = {};
    const pending = [fragment];
    let pl = 1;
    idmap[fragment.state.id] = this.start;
    for (; pl--; ) {
      const item = pending[0];
      pending.splice(0, 1);
      let state = idmap[item.state.id];
      if (!(state in states)) {
        states[state] = { not: [] };
      }
      const stateObject = states[state];
      let pointer = item.pointer;
      for (; pointer; pointer = pointer.next) {
        const chr = pointer.chr;
        const to = pointer.to;
        const id = to.id;
        if (!(id in processed)) {
          processed[id] = true;
          pending[pl++] = to;
        }
        state = to.state.id;
        if (!(state in idmap)) {
          idmap[state] = this.generateState();
        }
        state = idmap[state];
        if (pointer.negative) {
          const targets = stateObject.not;
          let tl = targets.length;
          const total = tl;
          let not = null;
          for (; tl--; ) {
            not = targets[tl];
            if (not[0] === state) {
              break;
            }
            not = null;
          }
          if (!not) {
            not = targets[total] = [state, {}];
          }
          const notIndex = not[1];
          if (!(chr in notIndex)) {
            notIndex[chr] = 1;
          }
        } else {
          if (!(chr in stateObject)) {
            stateObject[chr] = [];
          }
          const list = stateObject[chr];
          if (list.indexOf(state) === -1) {
            list[list.length] = state;
          }
        }
      }
    }
    for (let l = endStates.length; l--; ) {
      ends[idmap[endStates[l]]] = name;
    }
  }
  importDefinition(json) {
    let data;
    if ((0, import_common.isString)(json)) {
      try {
        data = JSON.parse(json);
      } catch (_e) {
        throw new Error("Invalid JSON string parameter.");
      }
    } else if ((0, import_common.isObject)(json)) {
      data = json;
    } else {
      throw new Error("Invalid JSON object parameter.");
    }
    const item = data.stateGenId;
    if (!(0, import_common.isNumber)(item) || item < 0) {
      throw new Error("Invalid state generator");
    }
    this.stateGenId = item;
    if (!(0, import_common.isString)(data.start)) {
      throw new Error("Invalid start state name");
    }
    this.start = data.start;
    if (!(0, import_common.isObject)(data.states)) {
      throw new Error("Invalid state map object");
    }
    this.states = data.states;
    if (!(0, import_common.isObject)(data.ends)) {
      throw new Error("Invalid end states object");
    }
    this.ends = data.ends;
    if (!(0, import_common.isArray)(data.priority)) {
      throw new Error("Invalid priority list");
    }
    this.priority = data.priority;
    return this;
  }
  exportDefinition() {
    return {
      stateGenId: this.stateGenId,
      start: this.start,
      states: this.states,
      ends: this.ends,
      priority: this.priority
    };
  }
};

// src/regex/functions/regex-tokenizer.function.ts
var HEX_RE = /^[a-fA-F0-9]{2}$/;
var UTF8_RE = /^[a-fA-F0-9]{4}$/;
var RANGE_RE = /^([0-9]+|[0-9]+,[0-9]*|[0-9]*,[0-9]+)$/;
var SPECIAL_CHAR = {
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "	",
  v: "\v",
  "\\": "\\",
  B: "\\"
};
function escape(index, regexString) {
  const c = index + 1;
  const len = c + 1;
  const chr = regexString.substring(c, len);
  switch (chr) {
    case "x": {
      const l = c + 2;
      const match = regexString.substring(c + 1, l + 1).match(HEX_RE);
      return match ? [String.fromCharCode(parseInt(match[0], 16)), l] : ["x", len];
    }
    case "u": {
      const l = c + 4;
      const match = regexString.substring(c + 1, l + 1).match(UTF8_RE);
      return match ? [String.fromCharCode(parseInt(match[0], 16)), l] : ["x", len];
    }
    default:
      return [chr in SPECIAL_CHAR ? SPECIAL_CHAR[chr] : chr, len];
  }
}
function range(index, regexString) {
  let c = index;
  let l = regexString.length;
  for (; l--; ) {
    const chr = regexString.charAt(++c);
    if (chr === "}") {
      const sub = regexString.substring(index + 1, c);
      if (RANGE_RE.test(sub)) {
        return [sub, c + 1];
      }
    }
  }
  return null;
}
function tokenize(index, regexString) {
  const len = regexString.length;
  index = Math.max(0, index);
  if (index > len) {
    return null;
  } else if (index === len) {
    return ["$$", null, len + 1];
  }
  let next = index + 1;
  let chr = regexString.charAt(index);
  let token = "char";
  switch (chr) {
    case "\\": {
      const escaped = escape(index, regexString);
      next = escaped[1];
      chr = escaped[0];
      token = "char";
      break;
    }
    case "{": {
      const rangeResult = range(index, regexString);
      if (rangeResult) {
        next = rangeResult[1];
        chr = rangeResult[0];
        token = "range";
      } else {
        throw new Error(
          "Invalid token near " + regexString.substring(
            index,
            Math.min(len, index + 10)
          )
        );
      }
      break;
    }
    case "[":
      if (next < len && regexString.charAt(next) === "^") {
        token = "[^";
        next++;
        break;
      }
    /* falls through */
    case "]":
    case "(":
    case ")":
    case "|":
    case "?":
    case "+":
    case "*":
    case "-":
    case "^":
    case "$":
      token = chr;
      break;
  }
  return token ? [token, chr, next] : null;
}

// src/regex/constants/operators.constant.ts
var ENCLOSED_START = 2;
var ENCLOSED_END = 3;
var BINARY = 4;
var POSTFIX = 5;
var FINAL = 6;
var OPERATOR = {
  "[": [ENCLOSED_START, 15, "]"],
  "[^": [ENCLOSED_START, 15, "]^"],
  "]": [ENCLOSED_END, 1, "[]"],
  "]^": [ENCLOSED_END, 1, "[^]"],
  "(": [ENCLOSED_START, 15, ")"],
  ")": [ENCLOSED_END, 1, "()"],
  "?": [POSTFIX, 10],
  "+": [POSTFIX, 10],
  "*": [POSTFIX, 10],
  range: [POSTFIX, 10],
  "-": [BINARY, 7],
  "^-": [BINARY, 7],
  "^,": [BINARY, 5],
  ",": [BINARY, 5],
  ".": [BINARY, 5],
  "|": [BINARY, 3],
  $$: [FINAL, 1]
};
var ENCLOSED_CLASS_REPLACE = {
  "[": "char",
  "[^": "char",
  "?": "char",
  "+": "char",
  "*": "char",
  ",": "char",
  "|": "char",
  "(": "char",
  ")": "char"
};
var ENCLOSED_REPLACE = {
  "[": ENCLOSED_CLASS_REPLACE,
  "[^": ENCLOSED_CLASS_REPLACE,
  "(": {
    "-": "char"
  }
};

// src/regex/functions/regex-parser.function.ts
function parse(str) {
  const operator = OPERATOR;
  let index = 0;
  let start = 0;
  let stack = null;
  const queue = [];
  let ql = 0;
  let lastToken = null;
  let enclosure = [null, "("];
  const buffer = [];
  let bl = 0;
  let bc = 0;
  for (let item = tokenize(index, str); item; item = tokenize(index, str)) {
    index = item[2];
    let chr = item[1];
    let token = item[0];
    let fill = false;
    const currentEnclosure = enclosure && enclosure[1];
    if (currentEnclosure) {
      const replacements = ENCLOSED_REPLACE[currentEnclosure];
      if (replacements && token in replacements) {
        token = replacements[token];
      }
    }
    if (token in operator) {
      switch (token) {
        case "(":
        case "[":
        case "[^":
          fill = !!lastToken && lastToken !== "|";
      }
    } else {
      switch (lastToken) {
        case "negative_char":
        case "char":
        case "]":
        case "]^":
        case ")":
        case "+":
        case "?":
        case "*":
        case "range":
          fill = true;
      }
    }
    if (fill) {
      buffer[bl++] = [
        currentEnclosure === "[" ? "," : currentEnclosure === "[^" ? "^," : ".",
        null,
        2,
        start,
        0
      ];
    }
    if (currentEnclosure === "[^") {
      switch (token) {
        case "-":
          token = "^-";
          break;
        case "]":
          token = "]^";
          break;
        case "char":
          token = "negative_char";
      }
    }
    buffer[bl++] = [token, chr, 0, start, index - start];
    start = index;
    lastToken = token;
    let l = bl - bc;
    for (; l--; bc++) {
      const bufItem = buffer[bc];
      token = bufItem[0];
      chr = bufItem[1];
      if (token in operator) {
        const op = operator[token];
        const opName = op[0];
        const precedence = op[1];
        switch (opName) {
          case FINAL:
          case POSTFIX:
          case BINARY:
            bufItem[2] = opName === BINARY ? 2 : 1;
            binaryCompare: for (; stack; stack = stack[0]) {
              const stackOp = stack[1];
              switch (stackOp[0]) {
                case POSTFIX:
                case BINARY:
                  if (precedence <= stackOp[1]) {
                    queue[ql++] = stack[2];
                    continue binaryCompare;
                  }
              }
              break binaryCompare;
            }
            if (opName !== FINAL) {
              stack = [stack, op, bufItem];
            } else {
              queue[ql++] = bufItem;
            }
            break;
          case ENCLOSED_START:
            stack = [stack, op, bufItem];
            enclosure = [enclosure, token];
            break;
          case ENCLOSED_END:
            for (; stack; stack = stack[0]) {
              const stackOp = stack[1];
              if (stackOp[0] === ENCLOSED_START) {
                if (stackOp[2] !== token) {
                  throw new Error(
                    "Unmatched token found " + chr
                  );
                }
                const from = stack[2][3];
                queue[ql++] = [
                  op[2],
                  null,
                  1,
                  from,
                  bufItem[3] - from + 1
                ];
                if (enclosure) {
                  enclosure = enclosure[0];
                }
                stack = stack[0];
                break;
              }
              queue[ql++] = stack[2];
            }
        }
      } else {
        queue[ql++] = bufItem;
      }
    }
  }
  if (stack) {
    throw new Error("Invalid token found " + stack[2][1]);
  }
  return queue;
}

// src/regex/functions/proto-clone.function.ts
function protoClone(instance) {
  return Object.create(instance);
}

// src/regex/classes/fragment.class.ts
var Fragment = class {
  id;
  state;
  builder;
  base = null;
  splitted = null;
  repeated = null;
  pointer = null;
  lastPointer = null;
  outgoing = null;
  lastOutgoing = null;
  constructor(builder, pointer) {
    this.id = "f" + ++builder.fgen;
    this.state = { id: null };
    this.builder = builder;
    if (pointer) {
      this.pointer = pointer;
      let p = pointer;
      for (; p.next; p = p.next) {
      }
      this.lastPointer = p;
      this.outgoing = this.lastOutgoing = {
        fragment: this,
        next: null
      };
    }
  }
  /**
   * Links this fragment to operand2 by
   * connecting outgoing edges and propagating
   * splits/repeats through the NFA graph.
   */
  link(operand2) {
    const operand1 = this;
    let outgoing = operand1.outgoing;
    let split = operand1.splitted;
    let newSplit = operand2.splitted;
    const repeat = operand1.repeated;
    operand2.applyState();
    for (; outgoing; outgoing = outgoing.next) {
      outgoing.fragment.pointer.point(operand2);
    }
    if (repeat) {
      let last = operand2.lastPointer;
      let rep = repeat;
      for (; rep; rep = rep.next) {
        const clonedPtr = rep.pointer;
        if (!last) {
          operand2.pointer = clonedPtr;
        } else {
          last.next = clonedPtr;
        }
        last = clonedPtr;
      }
      operand2.lastPointer = last;
    }
    const pointer = operand2.pointer;
    if (split && pointer) {
      let startSplit = null;
      let endSplit = null;
      for (; split; split = split.next) {
        const fragment2 = split.fragment;
        const cloned = pointer.clone();
        const last = fragment2.lastPointer.last();
        last.next = cloned[0];
        fragment2.lastPointer = cloned[1];
        if (fragment2.pointer !== operand1.pointer) {
          const created = {
            fragment: fragment2,
            next: null
          };
          if (!startSplit) {
            startSplit = created;
          } else {
            endSplit.next = created;
          }
          endSplit = created;
        }
      }
      if (endSplit) {
        endSplit.next = newSplit;
        newSplit = startSplit;
      }
    }
    const fragment = operand1.clone();
    fragment.splitted = newSplit;
    fragment.repeated = operand2.repeated;
    fragment.outgoing = operand2.outgoing;
    fragment.lastOutgoing = operand2.lastOutgoing;
    return fragment;
  }
  /**
   * Clones this fragment via prototype chain
   * sharing — the clone shares structural
   * properties with the original but can be
   * independently mutated.
   */
  clone() {
    const base = this.base;
    const cloned = protoClone(this);
    if (!base) {
      cloned.base = this;
    }
    cloned.id = "f" + ++this.builder.fgen;
    return cloned;
  }
  split(repeat) {
    const current = this.splitted;
    const splitNode = {
      fragment: this,
      next: null
    };
    const fragment = this.clone();
    if (repeat) {
      fragment.repeat();
    }
    if (!current) {
      fragment.splitted = splitNode;
    }
    return fragment;
  }
  repeat() {
    const pointer = this.pointer;
    const current = this.repeated;
    if (!current && pointer) {
      const cloned = pointer.clone();
      this.repeated = {
        pointer: cloned[0],
        next: null
      };
    }
    return this;
  }
  fill(operand2) {
    const operand1 = this;
    const rangeResult = operand1.pointer.range(operand2.pointer);
    if (rangeResult) {
      operand2.state = operand1.state;
      rangeResult[1].next = operand2.pointer;
      operand1.lastPointer.next = rangeResult[0];
      const fragment = operand1.clone();
      fragment.lastPointer = operand2.lastPointer;
      fragment.outgoing.next = operand2.outgoing;
      fragment.lastOutgoing = operand2.lastOutgoing;
      return fragment;
    }
    return this.merge(operand2);
  }
  merge(operand2) {
    const operand1 = this;
    const fragment = operand1.clone();
    operand2.state = operand1.state;
    operand1.lastPointer.next = operand2.pointer;
    operand1.lastOutgoing.next = operand2.outgoing;
    fragment.lastPointer = operand2.lastPointer;
    fragment.lastOutgoing = operand2.lastOutgoing;
    let first = operand1.splitted;
    let last = operand2.splitted;
    fragment.splitted = first || last;
    if (first && last) {
      let item = first;
      for (; item.next; item = item.next) {
      }
      item.next = last;
    }
    first = null;
    last = null;
    const firstRepeat = operand1.repeated;
    const lastRepeat = operand2.repeated;
    fragment.repeated = firstRepeat || lastRepeat;
    if (firstRepeat && lastRepeat) {
      let item = firstRepeat;
      for (; item.next; item = item.next) {
      }
      item.next = lastRepeat;
    }
    return fragment;
  }
  applyState() {
    const state = this.state;
    if (!state.id) {
      state.id = "s" + ++this.builder.gen;
    }
    return state;
  }
};

// src/regex/classes/pointer.class.ts
var import_common2 = require("@dikolab/common");
var Pointer = class _Pointer {
  negative;
  repeated = false;
  chr;
  to = null;
  next = null;
  constructor(chr, negative) {
    this.chr = chr || "";
    this.negative = negative === true;
  }
  clone(overrides) {
    let pointer = this;
    let from = null;
    let last = null;
    const includeNext = overrides !== false;
    const resolvedOverrides = overrides || null;
    for (; pointer; pointer = pointer.next) {
      const created = protoClone(pointer);
      if (resolvedOverrides) {
        (0, import_common2.assign)(
          created,
          resolvedOverrides
        );
      }
      if (from) {
        last.next = created;
      } else {
        from = created;
      }
      last = created;
      if (!includeNext) {
        break;
      }
    }
    last.next = null;
    return [from, last];
  }
  point(fragment) {
    let pointer = this;
    for (; pointer; pointer = pointer.next) {
      if (!pointer.to) {
        pointer.to = fragment;
      }
    }
    return this;
  }
  last() {
    let pointer = this;
    for (; pointer.next; pointer = pointer.next) {
    }
    return pointer;
  }
  range(to) {
    const chr = this.chr;
    const negative = this.negative;
    let from = chr.charCodeAt(0);
    const toCode = to.chr.charCodeAt(0);
    let len = Math.max(toCode - from - 1, 0);
    if (len) {
      let start = null;
      let end = null;
      for (; len--; ) {
        const created = new _Pointer(
          String.fromCharCode(++from),
          negative
        );
        if (start) {
          end.next = created;
        } else {
          start = created;
        }
        end = created;
      }
      return start ? [start, end] : null;
    }
    return null;
  }
};

// src/regex/functions/state-builder.function.ts
var PATTERN_ERROR = "Patterns resulting to empty token is not allowed. ";
function build(name, regex, stateObject) {
  const rpn = parse(regex);
  let c = -1;
  let l = rpn.length;
  let stack = null;
  let startState = null;
  let el = 0;
  const endStates = [];
  const errorName = name + " = /" + regex + "/";
  const builder = {
    gen: 0,
    fgen: 0
  };
  for (; l--; ) {
    const item = rpn[++c];
    const token = item[0];
    switch (token) {
      case ".":
        stack = [
          stack[0][0],
          stack[0][1].link(stack[1])
        ];
        break;
      case "?":
        stack = [stack[0], stack[1].split()];
        break;
      case "+":
        stack = [stack[0], stack[1].repeat()];
        break;
      case "*":
        stack = [stack[0], stack[1].split(true)];
        break;
      case "^,":
      case ",":
      case "|":
        stack = [
          stack[0][0],
          stack[0][1].merge(stack[1])
        ];
        break;
      case "^-":
      case "-":
        stack = [
          stack[0][0],
          stack[0][1].fill(stack[1])
        ];
        break;
      case "$$": {
        if (!stack || stack[0] !== null) {
          throw new Error(
            "Invalid end of expression. " + errorName
          );
        }
        const operand1 = stack[1];
        const operand2 = new Fragment(builder, null);
        operand1.link(operand2);
        const sid = startState.id;
        let id = operand2.state.id;
        if (id === sid) {
          throw new Error(PATTERN_ERROR + errorName);
        }
        endStates[el++] = id;
        let split = operand1.splitted;
        for (; split; split = split.next) {
          id = split.fragment.state.id;
          if (id === sid) {
            throw new Error(PATTERN_ERROR + errorName);
          }
          endStates[el++] = id;
        }
        break;
      }
      case "^":
      case "$":
      case "char":
      case "negative_char": {
        const operand1 = new Fragment(
          builder,
          new Pointer(item[1], token === "negative_char")
        );
        if (!startState) {
          startState = operand1.applyState();
        }
        stack = [stack, operand1];
        break;
      }
    }
  }
  if (el) {
    stateObject.finalizeFragments(name, stack[1], endStates);
  }
  return stateObject;
}

// src/tokenizer/classes/tokenizer.class.ts
var Tokenizer = class {
  map;
  constructor() {
    this.map = new StateMap();
  }
  /**
   * Registers token definitions
   *
   * @param definitions - Alternating array
   *   of token names and regex patterns
   * @returns This tokenizer instance
   */
  define(definitions) {
    const map = this.map;
    const priority = map.priority;
    let pl = priority.length;
    if (!(0, import_common3.isArray)(definitions)) {
      throw new Error("Invalid definitions parameter.");
    }
    let name = null;
    let c = -1;
    let len = definitions.length;
    for (; len--; ) {
      const item = definitions[++c];
      if ((0, import_common3.isString)(item)) {
        name = item;
      } else if ((0, import_common3.isRegex)(item)) {
        const source = item.source;
        if (!name) {
          throw new Error("Token is not named " + source);
        }
        if (priority.indexOf(name) === -1) {
          priority[pl++] = name;
        }
        build(name, source, map);
      }
    }
    return this;
  }
  /**
   * Imports a previously exported definition
   *
   * @param data - JSON string or object from
   *   toJSON/toObject
   * @returns This tokenizer instance
   */
  fromJSON(data) {
    this.map.importDefinition(data);
    return this;
  }
  /**
   * Exports definitions as a JSON string
   *
   * @returns JSON string of the state map
   */
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  /**
   * Exports definitions as a plain object
   *
   * @returns State map data object
   */
  toObject() {
    return this.map.exportDefinition();
  }
  /**
   * Extracts the next token from the input
   *
   * @param from - Start index in str
   * @param str - Input string to tokenize
   * @returns Token result or null
   */
  tokenize(from, str) {
    const map = this.map;
    const ends = map.ends;
    const states = map.states;
    const rank = map.priority;
    let cursor = [
      map.start,
      null
    ];
    const len = str.length;
    let limit = len - from;
    let index = from - 1;
    let found = null;
    let lastFound = null;
    if (limit === 0) {
      return ["$", "", len + 1];
    } else if (limit < 1) {
      return null;
    }
    for (; limit--; ) {
      const chr = str.charAt(++index);
      let next = null;
      for (; cursor; cursor = cursor[1]) {
        const state = cursor[0];
        const pointer = states[state];
        if (state in ends) {
          found = [ends[state], index, found];
        }
        if (chr in pointer) {
          const list = pointer[chr];
          for (let c = -1, l = list.length; l--; ) {
            const target = list[++c];
            next = [target, next];
            if (target in ends) {
              found = [ends[target], index + 1, found];
            }
          }
        }
        const not = pointer.not;
        for (let c = -1, l = not.length; l--; ) {
          const target = not[++c];
          const nmap = target[1];
          if (!(chr in nmap)) {
            const targetState = target[0];
            next = [targetState, next];
            if (targetState in ends) {
              found = [ends[targetState], index + 1, found];
            }
          }
        }
      }
      if (found) {
        lastFound = found;
      }
      found = null;
      if (next) {
        cursor = next;
      } else {
        break;
      }
    }
    let result = null;
    for (let pointer = lastFound; pointer; pointer = pointer[2]) {
      const idx = pointer[1];
      const priority = rank.indexOf(pointer[0]);
      if (!result || idx > result[1] || priority < result[2]) {
        result = [pointer[0], idx, priority];
      }
    }
    if (result) {
      const idx = result[1];
      if (from === idx) {
        result = null;
      } else {
        result[2] = idx;
        result[1] = str.substring(from, idx);
      }
    }
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tokenizer
});
//# sourceMappingURL=index.cjs.map
