(function(root, factory) {
   if (typeof define === 'function' && define.amd)
      define([], factory);
   else if (typeof module === 'object' &&
            module.exports)
      module.exports = factory();
   else
      root.DikolabLalrParser = factory();
})(typeof self !== 'undefined' ?
   self : this, function() {
var __esbuild_iife_result = (() => {
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
    BaseIterator: () => BaseIterator,
    Iterator: () => BaseIterator,
    Lexeme: () => Lexeme,
    Parser: () => Parser,
    debug: () => debug,
    define: () => define2,
    isParser: () => isParser,
    load: () => load,
    registerIterator: () => registerIterator
  });

  // ../common/lib/chunk-DZZ66UJO.mjs
  var OBJECT = "[object Object]";
  var ARRAY = "[object Array]";
  var NULL = "[object Null]";
  var UNDEFINED = "[object Undefined]";
  var STRING = "[object String]";
  var METHOD = "[object Function]";
  var DATE = "[object Date]";
  var REGEX = "[object RegExp]";

  // ../common/lib/chunk-6BGNHZOB.mjs
  var toString = Object.prototype.toString;
  function isArray(subject, notEmpty = false) {
    return toString.call(subject) === ARRAY && (!notEmpty || subject.length !== 0);
  }

  // ../common/lib/chunk-UBVVGG7X.mjs
  var G = globalThis;
  function isBrowser() {
    try {
      return "document" in G && "window" in G && G.document.defaultView === G.window;
    } catch {
      return false;
    }
  }
  function getNodeVersions() {
    try {
      if ("process" in G && G.process && G.process.versions) {
        return G.process.versions;
      }
    } catch {
    }
    return false;
  }
  function getUserAgent(isBrowserEnv, versions) {
    if (isBrowserEnv) {
      try {
        return String(
          G.navigator && G.navigator.userAgent
        );
      } catch {
        return "Unknown";
      }
    }
    if (versions && "process" in G) {
      const proc = G.process;
      return "Node " + String(versions.node) + "(" + String(proc.platform) + "; V8 " + String(versions.v8 || "unknown") + "; arch " + String(proc.arch) + ")";
    }
    return "Unknown";
  }
  var browser = isBrowser();
  var nodeVersions = getNodeVersions();
  var nodejs = !!nodeVersions && !!nodeVersions.node;
  var userAgent = getUserAgent(browser, nodeVersions);

  // ../common/lib/chunk-HJNVEGFY.mjs
  var toString2 = Object.prototype.toString;
  function signature(subject) {
    if (subject === void 0) {
      return UNDEFINED;
    }
    if (subject === null || typeof subject === "number" && !isFinite(subject)) {
      return NULL;
    }
    return toString2.call(subject);
  }

  // ../common/lib/chunk-Z6T5S4RH.mjs
  var hasOwn = Object.prototype.hasOwnProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  function isValidObject(target) {
    switch (signature(target)) {
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
        return true;
    }
    return false;
  }
  function each(subject, handler, scope, hasown) {
    if (!isValidObject(subject)) {
      throw new Error("Invalid [subject] parameter.");
    }
    const noChecking = hasown === false;
    const resolvedScope = scope === void 0 ? null : scope;
    const names = getOwnPropertyNames(subject);
    for (let c = 0; c < names.length; c++) {
      const name = names[c];
      if ((noChecking || hasOwn.call(subject, name)) && handler.call(resolvedScope, subject[name], name, subject) === false) {
        break;
      }
    }
    return subject;
  }

  // ../common/lib/chunk-7D27R3YN.mjs
  function apply(value, name) {
    this[name] = value;
  }
  function assign(target, source, defaults, ownedOnly) {
    if (!isValidObject(target)) {
      throw new Error("Invalid [target] parameter.");
    }
    if (!isValidObject(source)) {
      throw new Error("Invalid [source] parameter.");
    }
    let resolvedOwned;
    if (typeof defaults === "boolean") {
      resolvedOwned = defaults;
      defaults = void 0;
    } else {
      resolvedOwned = ownedOnly !== false;
    }
    if (isValidObject(defaults)) {
      each(defaults, apply, target, resolvedOwned);
    } else if (defaults !== void 0) {
      throw new Error("Invalid [defaults] parameter.");
    }
    each(source, apply, target, resolvedOwned);
    return target;
  }

  // ../common/lib/chunk-4K76VZWE.mjs
  var toString3 = Object.prototype.toString;
  function isObject(subject) {
    return toString3.call(subject) === OBJECT;
  }

  // ../common/lib/chunk-IMQK2X3Q.mjs
  var toString4 = Object.prototype.toString;
  function isString(subject, allowEmpty = false) {
    return (typeof subject === "string" || toString4.call(subject) === STRING) && (allowEmpty || subject.length !== 0);
  }

  // ../common/lib/chunk-JAESEHZ5.mjs
  var toString5 = Object.prototype.toString;
  function isMethod(subject) {
    return toString5.call(subject) === METHOD;
  }

  // ../common/lib/chunk-ZZUM7IAB.mjs
  var O = Object;
  var hasOwn2 = O.prototype.hasOwnProperty;

  // ../common/lib/chunk-TVSXR7AM.mjs
  var toString6 = Object.prototype.toString;
  function isRegex(subject) {
    return toString6.call(subject) === REGEX;
  }

  // ../common/lib/chunk-3IYQFDCZ.mjs
  function isNumber(subject) {
    return typeof subject === "number" && isFinite(subject);
  }

  // ../common/lib/chunk-UXJOVXAW.mjs
  var hasOwn3 = Object.prototype.hasOwnProperty;
  function contains(subject, property) {
    if (!isString(property) && !isNumber(property)) {
      throw new Error("Invalid [property] parameter.");
    }
    return hasOwn3.call(subject, property);
  }

  // ../common/lib/chunk-RN256LLQ.mjs
  var fromCharCode = String.fromCharCode;

  // ../common/lib/chunk-J3HT6EC5.mjs
  var fromCharCode2 = String.fromCharCode;

  // ../common/lib/chunk-5DSOVZ7J.mjs
  var fromCharCode3 = String.fromCharCode;

  // ../common/lib/chunk-PSF73SNE.mjs
  var G2 = globalThis;
  var hasSetImmediate = typeof G2.setImmediate === "function";

  // ../tokenizer/lib/chunk-RWYLBUID.mjs
  function protoClone(instance) {
    return Object.create(instance);
  }

  // ../tokenizer/lib/chunk-5HQPRLHD.mjs
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

  // ../tokenizer/lib/chunk-YPRCETJA.mjs
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
          assign(
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

  // ../tokenizer/lib/chunk-JHCE4ZR2.mjs
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

  // ../tokenizer/lib/chunk-UH5XYUDV.mjs
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

  // ../tokenizer/lib/chunk-K7P2GRSF.mjs
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

  // ../tokenizer/lib/chunk-65IUPJ6F.mjs
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

  // ../tokenizer/lib/chunk-DJ3VAFQP.mjs
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
      if (isString(id)) {
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
      if (isString(json)) {
        try {
          data = JSON.parse(json);
        } catch (_e) {
          throw new Error("Invalid JSON string parameter.");
        }
      } else if (isObject(json)) {
        data = json;
      } else {
        throw new Error("Invalid JSON object parameter.");
      }
      const item = data.stateGenId;
      if (!isNumber(item) || item < 0) {
        throw new Error("Invalid state generator");
      }
      this.stateGenId = item;
      if (!isString(data.start)) {
        throw new Error("Invalid start state name");
      }
      this.start = data.start;
      if (!isObject(data.states)) {
        throw new Error("Invalid state map object");
      }
      this.states = data.states;
      if (!isObject(data.ends)) {
        throw new Error("Invalid end states object");
      }
      this.ends = data.ends;
      if (!isArray(data.priority)) {
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

  // ../tokenizer/lib/chunk-BPEOENW6.mjs
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
      if (!isArray(definitions)) {
        throw new Error("Invalid definitions parameter.");
      }
      let name = null;
      let c = -1;
      let len = definitions.length;
      for (; len--; ) {
        const item = definitions[++c];
        if (isString(item)) {
          name = item;
        } else if (isRegex(item)) {
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

  // src/state/classes/state-map.class.ts
  var StateMap2 = class {
    stateGen = 0;
    symbolGen = 0;
    reduceGen = 0;
    rawStates = [];
    debugMode = false;
    finalized = false;
    lookup = {};
    symbol = {};
    start = "0";
    states = {};
    ends = {};
    exclude = {};
    reduceLookup = {};
    reducers = {};
    root = "";
    augmentedRoot = "";
    endSymbol = "";
    endToken = "";
    constructor(debug2) {
      this.init(debug2);
    }
    init(debug2) {
      const start = "0";
      const end = "End";
      const tokenEnd = "$";
      const states = {};
      this.stateGen = 0;
      this.symbolGen = 0;
      this.reduceGen = 0;
      states[start] = {};
      this.lookup = {};
      this.symbol = {};
      this.start = start;
      this.states = states;
      this.ends = {};
      this.exclude = {};
      this.finalized = false;
      this.rawStates = [];
      this.reduceLookup = {};
      this.reducers = {};
      this.debugMode = debug2 === true;
      this.setRoot(end);
      this.endSymbol = this.generateSymbol(tokenEnd);
      this.endToken = tokenEnd;
    }
    generateState() {
      return "s" + (++this.stateGen).toString(36);
    }
    setRoot(name) {
      this.root = this.generateSymbol(name);
      this.augmentedRoot = this.generateSymbol(name + "'");
    }
    createState(id) {
      const states = this.states;
      if (id in states) {
        return states[id];
      }
      return states[id] = {};
    }
    createPointer(id, token, target) {
      const state = this.createState(id);
      state[token] = target;
      return state;
    }
    generateSymbol(name) {
      const lookup = this.lookup;
      const symbols = this.symbol;
      const access = ":" + name;
      if (access in lookup) {
        return lookup[access];
      }
      const id = this.debugMode ? "[" + name + "]" : (++this.symbolGen).toString(36);
      lookup[access] = id;
      symbols[id] = name;
      return id;
    }
    generateReduceId(name, params, ruleIndex) {
      const lookup = this.reduceLookup;
      const all = this.reducers;
      const access = name + ":" + params + ":" + ruleIndex;
      if (access in lookup) {
        return lookup[access];
      }
      const id = this.debugMode ? "[" + name + ":" + params + ">" + ruleIndex + "]" : (++this.reduceGen).toString(36);
      lookup[access] = id;
      all[id] = [name, params, ruleIndex];
      return id;
    }
    lookupReducer(id) {
      const all = this.reducers;
      if (id in all) {
        return all[id];
      }
      return false;
    }
    lookupSymbol(name) {
      const symbols = this.symbol;
      if (name in symbols) {
        return symbols[name];
      }
      return false;
    }
    setReduceState(state, name, params, ruleIndex) {
      const ends = this.ends;
      const id = this.generateReduceId(name, params, ruleIndex);
      const all = this.reducers;
      if (state in ends) {
        const current = all[ends[state]];
        if (current[0] !== name || current[1] !== params) {
          throw new Error(
            "Reduce conflict found " + this.lookupSymbol(current[0]) + " ! <- " + this.lookupSymbol(name)
          );
        }
      } else {
        ends[state] = id;
      }
    }
    reset() {
      this.init(this.debugMode);
    }
    finalize() {
      const list = this.rawStates;
      if (!this.finalized && list) {
        this.finalized = true;
        for (let c = -1, l = list.length; l--; ) {
          list[++c].finalize();
        }
        list.length = 0;
        delete this.lookup;
      }
      return this.finalized;
    }
    setExcludes(exclude) {
      const current = this.exclude;
      if (isArray(exclude)) {
        const list = exclude;
        for (let c = -1, l = list.length; l--; ) {
          current[list[++c]] = true;
        }
      }
    }
    importStates(definition) {
      if (!isObject(definition)) {
        throw new Error("Invalid Object definition parameter.");
      }
      const states = definition.states;
      if (!isObject(states)) {
        throw new Error(
          'Invalid "states" Object in definition parameter.'
        );
      }
      const root = definition.root;
      if (!isString(root)) {
        throw new Error(
          'Invalid "root" grammar rule in definition parameter.'
        );
      }
      const augmentedRoot = definition.augmentedRoot;
      if (!isString(augmentedRoot)) {
        throw new Error(
          'Invalid "augmentedRoot" grammar rule in definition parameter.'
        );
      }
      const start = definition.start;
      if (!isString(start) || !(start in states)) {
        throw new Error(
          'Invalid "start" state in definition parameter.'
        );
      }
      const ends = definition.ends;
      if (!isObject(ends)) {
        throw new Error(
          'Invalid "ends" states in definition parameter.'
        );
      }
      const reducers = definition.reducers;
      if (!isObject(reducers)) {
        throw new Error(
          'Invalid production "reducers" in definition.'
        );
      }
      const symbolMap = definition.symbol;
      if (!isObject(symbolMap)) {
        throw new Error(
          'Invalid "symbol" map in definition parameter.'
        );
      }
      const list = definition.exclude;
      if (!isArray(list)) {
        throw new Error(
          'Invalid "exclude" token in definition parameter.'
        );
      }
      const excludeMap = {};
      for (let c = -1, l = list.length; l--; ) {
        excludeMap[list[++c]] = true;
      }
      this.augmentedRoot = augmentedRoot;
      this.root = root;
      this.start = start;
      this.states = states;
      this.ends = ends;
      this.reducers = reducers;
      this.exclude = excludeMap;
      this.symbol = symbolMap;
      return true;
    }
    toObject() {
      const has = contains;
      const exclude = this.exclude;
      const list = [];
      let len = 0;
      for (const name in exclude) {
        if (has(exclude, name)) {
          list[len++] = name;
        }
      }
      return {
        augmentedRoot: this.augmentedRoot,
        root: this.root,
        start: this.start,
        states: this.states,
        reducers: this.reducers,
        ends: this.ends,
        exclude: list,
        symbol: this.symbol
      };
    }
    exportStates(json) {
      const current = this.toObject();
      if (json === true) {
        try {
          return JSON.stringify(current);
        } catch (_e) {
          return null;
        }
      }
      return current;
    }
  };

  // src/state/builder/functions/rule.function.ts
  var NONTERMINAL_RE = /^([A-Z][a-zA-Z]+(\_?[a-zA-Z0-9])*\'?)$/;
  function isTerminal(name) {
    return name === "$" || !NONTERMINAL_RE.test(name);
  }
  function defineTerminals(registry, name, definitions) {
    for (let c = -1, l = definitions.length; l--; ) {
      const terminal = definitions[++c];
      if (!isRegex(terminal)) {
        throw new Error("Invalid Terminal pattern: " + terminal);
      }
      if (!registry.registerTerminal(terminal, name)) {
        throw new Error("Invalid Terminal pattern: " + terminal);
      }
    }
  }
  function defineRules(registry, name, definitions) {
    for (let c = -1, l = definitions.length; l--; ) {
      let rule = definitions[++c];
      if (isString(rule) || isRegex(rule)) {
        rule = [rule];
      } else if (!isArray(rule)) {
        throw new Error(
          "Invalid Grammar rule declared in " + name
        );
      }
      const ruleArr = rule;
      let rl = ruleArr.length;
      const ruleMask = [];
      const terminals = {};
      for (; rl--; ) {
        let lexeme = ruleArr[rl];
        let isTerminalToken;
        if (isRegex(lexeme)) {
          if (!registry.terminalExist(lexeme)) {
            registry.registerTerminal(lexeme);
          }
          lexeme = "/" + lexeme.source + "/";
          isTerminalToken = true;
        } else if (!isString(lexeme)) {
          throw new Error(
            "Invalid Grammar rule declared in " + name
          );
        } else {
          isTerminalToken = isTerminal(lexeme);
        }
        ruleMask[rl] = registry.map.generateSymbol(lexeme);
        if (isTerminalToken) {
          terminals[rl] = true;
        }
      }
      registry.registerRule(name, ruleMask, terminals);
    }
  }

  // src/state/define/classes/define-state.class.ts
  var DefineState = class {
    id;
    registry;
    items;
    end = null;
    tokens = [];
    pointers = {};
    constructor(registry, id, items) {
      this.id = id;
      this.registry = registry;
      this.items = items || [];
    }
    containsItems(items) {
      const myItems = this.items;
      const total = myItems.length;
      if (items.length === total) {
        let mylen = total;
        mainLoop: for (; mylen--; ) {
          const subject = myItems[mylen];
          let len = total;
          for (; len--; ) {
            if (subject === items[len]) {
              continue mainLoop;
            }
          }
          return false;
        }
        return true;
      }
      return false;
    }
    pointTo(token, targetState) {
      const names = this.tokens;
      const pointers = this.pointers;
      const map = this.registry.map;
      if (token in pointers) {
        if (pointers[token] !== targetState) {
          throw new Error(
            "Invalid state target from " + this.id + " -> " + map.lookupSymbol(token) + " -> " + map.lookupSymbol(targetState.id)
          );
        }
      } else {
        pointers[token] = targetState;
        names[names.length] = token;
      }
    }
    setEnd(item) {
      const current = this.end;
      const map = this.registry.map;
      if (current) {
        throw new Error(
          "There is reduce-reduce conflict in: " + this.id + " when you tried reducing it to `" + map.lookupSymbol(item.production) + "`, currently this state is reduced in `" + map.lookupSymbol(current[1]) + "` production."
        );
      }
      this.end = [item.params, item.production, item.index];
    }
  };

  // src/state/define/classes/define-list.class.ts
  var DefineList = class {
    first = null;
    last = null;
    shift() {
      const item = this.first;
      if (item) {
        const first = item[0];
        this.first = first;
        if (!first) {
          this.last = first;
        }
        return item[1];
      }
      return null;
    }
    pop() {
      const item = this.last;
      if (item) {
        const last = item[0];
        this.last = last;
        if (!last) {
          this.first = last;
        }
        return item[1];
      }
      return null;
    }
    push(value) {
      const item = [null, value];
      if (this.last) {
        this.last[0] = item;
      } else {
        this.first = item;
      }
      this.last = item;
      return this;
    }
  };

  // src/state/define/functions/define.function.ts
  function define(registry) {
    const map = registry.map;
    const productionStatesIndex = registry.productions;
    const closureDefinitions = registry.closureItems;
    const stateDefineQueue = new DefineList();
    const STATE_END = 0;
    const STATE_CREATE_INITIAL = 1;
    const STATE_CREATE_GOTO = 2;
    let defineState = STATE_CREATE_INITIAL;
    const production = map.augmentedRoot;
    const states = [];
    let sl = 0;
    for (; defineState; ) {
      switch (defineState) {
        case STATE_CREATE_INITIAL: {
          const closure = registry.createClosure(
            productionStatesIndex[production]
          );
          const list = closure[1];
          sl = states.length;
          const state = states[sl] = new DefineState(
            registry,
            sl.toString(32),
            closure[0]
          );
          let c = -1;
          let l = list.length;
          for (; l--; ) {
            const item = list[++c];
            stateDefineQueue.push([state, item[1], item[0]]);
          }
          if (!stateDefineQueue.first) {
            defineState = STATE_END;
            break;
          }
          defineState = STATE_CREATE_GOTO;
          break;
        }
        case STATE_CREATE_GOTO: {
          const queued = stateDefineQueue.shift();
          const stateBefore = queued[0];
          const list = queued[1];
          const token = queued[2];
          const closure = registry.createClosure(list);
          const items = closure[0];
          const tokens = closure[1];
          let total = sl = states.length;
          let state = null;
          for (; sl--; ) {
            const candidate = states[sl];
            if (candidate.containsItems(items)) {
              state = candidate;
              break;
            }
          }
          if (!state) {
            sl = total++;
            state = states[sl] = new DefineState(
              registry,
              sl.toString(32),
              items
            );
            let c = -1;
            let l = tokens.length;
            for (; l--; ) {
              const item = tokens[++c];
              stateDefineQueue.push([state, item[1], item[0]]);
            }
            c = -1;
            l = items.length;
            for (; l--; ) {
              const item = closureDefinitions[items[++c]];
              if (!item.after) {
                state.setEnd(item);
              }
            }
          }
          stateBefore.pointTo(token, state);
          defineState = stateDefineQueue.first ? STATE_CREATE_GOTO : STATE_END;
          break;
        }
        case STATE_END:
          defineState = null;
      }
    }
    sl = states.length;
    for (; sl--; ) {
      const stateItem = states[sl];
      const id = stateItem.id;
      map.createState(id);
      const tokens = stateItem.tokens;
      const lookup = stateItem.pointers;
      let c = -1;
      let l = tokens.length;
      for (; l--; ) {
        const token = tokens[++c];
        map.createPointer(id, token, lookup[token].id);
      }
      const end = stateItem.end;
      if (end) {
        map.setReduceState(id, end[1], end[0], end[2]);
      }
    }
  }

  // src/state/builder/classes/registry.class.ts
  var Registry2 = class {
    tokenizer;
    map;
    ruleLookup = {};
    productions = {};
    closureItems = {};
    terminals = [];
    terminalLookup = {};
    stateTagIdGen = 0;
    stateTagId = {};
    stateTagIdLookup = {};
    constructor(map, tokenizer) {
      this.tokenizer = tokenizer;
      this.map = map;
    }
    hashState(name) {
      const lookup = this.stateTagIdLookup;
      const access = ":" + name;
      if (access in lookup) {
        return lookup[access];
      }
      const id = this.map.debugMode ? ":" + name : (++this.stateTagIdGen).toString(36);
      lookup[access] = id;
      this.stateTagId[id] = name;
      return id;
    }
    lookupState(id) {
      const list = this.stateTagId;
      return id in list ? list[id] : null;
    }
    terminalExist(terminal) {
      const lookup = this.terminalLookup;
      return isString(terminal) ? contains(lookup, terminal) : "/" + terminal.source + "/" in lookup;
    }
    registerTerminal(terminal, name) {
      const lookup = this.terminalLookup;
      const names = this.terminals;
      const access = this.map.generateSymbol(
        "/" + terminal.source + "/"
      );
      if (!name) {
        name = access;
      }
      if (!(access in lookup)) {
        lookup[access] = name;
        if (access === name) {
          names[names.length] = name;
        } else if (!contains(lookup, name)) {
          names[names.length] = name;
          lookup[name] = [access];
        } else {
          const list = lookup[name];
          list[list.length] = access;
        }
        this.tokenizer.define([name, terminal]);
        return name;
      }
      return false;
    }
    registerRule(name, mask, terminals) {
      const closureItems = this.closureItems;
      let rules = this.productions;
      const ruleIndex = this.ruleLookup;
      let c = -1;
      let l = mask.length + 1;
      let before = null;
      let params = 0;
      if (!(name in rules)) {
        rules[name] = [];
      }
      rules = rules;
      const ruleList = rules[name];
      const ruleCount = ruleList.length + 1;
      for (; l--; ) {
        const items = mask.slice(0);
        items.splice(++c, 0, ".");
        const state = this.hashState(name + "->" + items.join(" "));
        if (!c) {
          if (state in ruleIndex) {
            throw new Error(
              "Duplicate Grammar Rule found " + this.lookupState(state) + " in production: " + this.map.lookupSymbol(name)
            );
          }
          ruleIndex[state] = name;
          ruleList[ruleList.length] = state;
        }
        const item = {
          id: state,
          production: name,
          index: ruleCount,
          before: null,
          after: null,
          terminal: false,
          token: null
        };
        closureItems[state] = item;
        if (before) {
          item.before = before.id;
          before.after = state;
        }
        before = item;
        if (l) {
          params++;
          item.terminal = c in terminals;
          item.token = mask[c];
        } else {
          item.params = params;
        }
      }
    }
    createClosure(items) {
      const definitions = this.closureItems;
      const productionItems = this.productions;
      const created = {};
      const processed = {};
      const tokens = [];
      let tl = 0;
      let c = -1;
      let l = items.length;
      items = items.slice(0);
      for (; l--; ) {
        const itemId = items[++c];
        if (itemId in created) {
          items.splice(c--, 1);
          continue;
        }
        created[itemId] = true;
        const item = definitions[itemId];
        const token = item.token;
        const terminal = item.terminal;
        if (token) {
          if (token in processed) {
            const list = tokens[processed[token]][1];
            list[list.length] = item.after;
          } else {
            processed[token] = tl;
            tokens[tl++] = [token, [item.after]];
            if (!terminal) {
              const additional = productionItems[token];
              items.push(...additional);
              l += additional.length;
            }
          }
        }
      }
      return [items, tokens];
    }
  };

  // src/state/builder/functions/build.function.ts
  function build2(root, map, tokenizer, definitions, exclude) {
    let name = null;
    let terminalDefinition = true;
    map.reset();
    map.setRoot(root);
    const registry = new Registry2(map, tokenizer);
    definitions.splice(
      definitions.length,
      0,
      map.lookupSymbol(map.augmentedRoot),
      [[root, map.lookupSymbol(map.endSymbol)]]
    );
    for (let c = -1, l = definitions.length; l--; ) {
      const definition = definitions[++c];
      if (isString(definition)) {
        terminalDefinition = isTerminal(definition);
        name = map.generateSymbol(definition);
      } else if (name && isArray(definition)) {
        if (terminalDefinition) {
          defineTerminals(registry, name, definition);
        } else {
          defineRules(registry, name, definition);
        }
      } else {
        throw new Error("Invalid item in definitions parameter.");
      }
    }
    define(registry);
    if (isArray(exclude)) {
      const excludes = [];
      const excludeArr = exclude;
      for (let c = -1, l = excludeArr.length; l--; ) {
        let definition = excludeArr[++c];
        if (isRegex(definition)) {
          definition = registry.registerTerminal(definition);
        } else if (isString(definition)) {
          definition = map.generateSymbol(definition);
        } else {
          throw new Error(
            "Invalid [exclude] pattern parameter."
          );
        }
        excludes[c] = definition;
      }
      map.setExcludes(excludes);
    }
    return true;
  }

  // src/lexeme/types/lexeme.type.ts
  var LEXEME_TYPE = {
    terminal: 1,
    nonterminal: 2,
    compound: 3,
    end: 4
  };

  // src/lexeme/classes/lexeme.class.ts
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
    constructor(type2) {
      this.terminal = false;
      this.useType(type2);
    }
    /**
     * Sets the lexeme type code
     *
     * @param type - Type name key
     * @returns void
     */
    useType(type2) {
      const types = LEXEME_TYPE;
      this.type = contains(types, type2) ? types[type2] : types.token;
      if (this.type === LEXEME_TYPE.terminal) {
        this.terminal = true;
      }
    }
  };

  // src/iterator/classes/base-iterator.class.ts
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

  // src/iterator/functions/iterator-registry.function.ts
  var defaultIteratorName = "base";
  var ITERATORS = {};
  function registerIterator(name, Class) {
    const Base = BaseIterator;
    if (!isString(name)) {
      throw new Error("Invalid iterator name parameter.");
    }
    if (!isMethod(Class) || Class !== Base && !(Class.prototype instanceof Base)) {
      throw new Error("Invalid iterator Class parameter.");
    }
    ITERATORS[":" + name] = Class;
    return true;
  }
  function getIterator(name) {
    const list = ITERATORS;
    if (isString(name)) {
      const key = ":" + name;
      if (key in list) {
        return list[key];
      }
    }
    return null;
  }
  var defaultIterator = defaultIteratorName;
  registerIterator(
    defaultIteratorName,
    BaseIterator
  );

  // src/parser/classes/parser.class.ts
  var debugMode = false;
  var Parser = class {
    tokenizer;
    map;
    ready = false;
    constructor(root, definition, exclude) {
      this.tokenizer = new Tokenizer();
      this.map = new StateMap2(debugMode);
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
      const ready = build2(
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

  // src/parser/functions/define.function.ts
  function define2(root, definitions, exclusions) {
    return new Parser(root, definitions, exclusions);
  }

  // src/parser/functions/load.function.ts
  function load(json) {
    if (isString(json)) {
      try {
        json = JSON.parse(json);
      } catch (e) {
        throw new Error(
          "Unable to load from invalid json JSON String parameter: " + String(e)
        );
      }
    } else if (!isObject(json)) {
      throw new Error(
        "Unable to load from invalid json Object parameter."
      );
    }
    const parser = new Parser();
    try {
      parser.fromJSON(json);
    } catch (e) {
      throw new Error(String(e));
    }
    return parser;
  }

  // src/parser/functions/is-parser.function.ts
  function isParser(parser) {
    return parser instanceof Parser;
  }
  return __toCommonJS(index_exports);
})();
return __esbuild_iife_result;});
//# sourceMappingURL=index.umd.js.map
