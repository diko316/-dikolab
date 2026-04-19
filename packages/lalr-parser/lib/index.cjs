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
module.exports = __toCommonJS(index_exports);

// src/parser/classes/parser.class.ts
var import_common8 = require("@dikolab/common");
var import_tokenizer = require("@dikolab/tokenizer");

// src/state/classes/state-map.class.ts
var import_common = require("@dikolab/common");
var StateMap = class {
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
    if ((0, import_common.isArray)(exclude)) {
      const list = exclude;
      for (let c = -1, l = list.length; l--; ) {
        current[list[++c]] = true;
      }
    }
  }
  importStates(definition) {
    if (!(0, import_common.isObject)(definition)) {
      throw new Error("Invalid Object definition parameter.");
    }
    const states = definition.states;
    if (!(0, import_common.isObject)(states)) {
      throw new Error(
        'Invalid "states" Object in definition parameter.'
      );
    }
    const root = definition.root;
    if (!(0, import_common.isString)(root)) {
      throw new Error(
        'Invalid "root" grammar rule in definition parameter.'
      );
    }
    const augmentedRoot = definition.augmentedRoot;
    if (!(0, import_common.isString)(augmentedRoot)) {
      throw new Error(
        'Invalid "augmentedRoot" grammar rule in definition parameter.'
      );
    }
    const start = definition.start;
    if (!(0, import_common.isString)(start) || !(start in states)) {
      throw new Error(
        'Invalid "start" state in definition parameter.'
      );
    }
    const ends = definition.ends;
    if (!(0, import_common.isObject)(ends)) {
      throw new Error(
        'Invalid "ends" states in definition parameter.'
      );
    }
    const reducers = definition.reducers;
    if (!(0, import_common.isObject)(reducers)) {
      throw new Error(
        'Invalid production "reducers" in definition.'
      );
    }
    const symbolMap = definition.symbol;
    if (!(0, import_common.isObject)(symbolMap)) {
      throw new Error(
        'Invalid "symbol" map in definition parameter.'
      );
    }
    const list = definition.exclude;
    if (!(0, import_common.isArray)(list)) {
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
    const has = import_common.contains;
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

// src/state/builder/functions/build.function.ts
var import_common4 = require("@dikolab/common");

// src/state/builder/functions/rule.function.ts
var import_common2 = require("@dikolab/common");
var NONTERMINAL_RE = /^([A-Z][a-zA-Z]+(\_?[a-zA-Z0-9])*\'?)$/;
function isTerminal(name) {
  return name === "$" || !NONTERMINAL_RE.test(name);
}
function defineTerminals(registry, name, definitions) {
  for (let c = -1, l = definitions.length; l--; ) {
    const terminal = definitions[++c];
    if (!(0, import_common2.isRegex)(terminal)) {
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
    if ((0, import_common2.isString)(rule) || (0, import_common2.isRegex)(rule)) {
      rule = [rule];
    } else if (!(0, import_common2.isArray)(rule)) {
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
      if ((0, import_common2.isRegex)(lexeme)) {
        if (!registry.terminalExist(lexeme)) {
          registry.registerTerminal(lexeme);
        }
        lexeme = "/" + lexeme.source + "/";
        isTerminalToken = true;
      } else if (!(0, import_common2.isString)(lexeme)) {
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
var import_common3 = require("@dikolab/common");
var Registry = class {
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
    return (0, import_common3.isString)(terminal) ? (0, import_common3.contains)(lookup, terminal) : "/" + terminal.source + "/" in lookup;
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
      } else if (!(0, import_common3.contains)(lookup, name)) {
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
function build(root, map, tokenizer, definitions, exclude) {
  let name = null;
  let terminalDefinition = true;
  map.reset();
  map.setRoot(root);
  const registry = new Registry(map, tokenizer);
  definitions.splice(
    definitions.length,
    0,
    map.lookupSymbol(map.augmentedRoot),
    [[root, map.lookupSymbol(map.endSymbol)]]
  );
  for (let c = -1, l = definitions.length; l--; ) {
    const definition = definitions[++c];
    if ((0, import_common4.isString)(definition)) {
      terminalDefinition = isTerminal(definition);
      name = map.generateSymbol(definition);
    } else if (name && (0, import_common4.isArray)(definition)) {
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
  if ((0, import_common4.isArray)(exclude)) {
    const excludes = [];
    const excludeArr = exclude;
    for (let c = -1, l = excludeArr.length; l--; ) {
      let definition = excludeArr[++c];
      if ((0, import_common4.isRegex)(definition)) {
        definition = registry.registerTerminal(definition);
      } else if ((0, import_common4.isString)(definition)) {
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

// src/iterator/functions/iterator-registry.function.ts
var import_common7 = require("@dikolab/common");

// src/iterator/classes/base-iterator.class.ts
var import_common6 = require("@dikolab/common");

// src/lexeme/classes/lexeme.class.ts
var import_common5 = require("@dikolab/common");

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
    this.type = (0, import_common5.contains)(types, type) ? types[type] : types.token;
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
    if (!(0, import_common6.isString)(subject)) {
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
        if (!(0, import_common6.isNumber)(result)) {
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
  if (!(0, import_common7.isString)(name)) {
    throw new Error("Invalid iterator name parameter.");
  }
  if (!(0, import_common7.isMethod)(Class) || Class !== Base && !(Class.prototype instanceof Base)) {
    throw new Error("Invalid iterator Class parameter.");
  }
  ITERATORS[":" + name] = Class;
  return true;
}
function getIterator(name) {
  const list = ITERATORS;
  if ((0, import_common7.isString)(name)) {
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
    this.tokenizer = new import_tokenizer.Tokenizer();
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
    if (!(0, import_common8.isString)(root)) {
      throw new Error("Invalid root grammar rule parameter.");
    }
    if (!(0, import_common8.isArray)(definition)) {
      throw new Error(
        "Invalid grammar rules definition parameter"
      );
    }
    if (!(0, import_common8.isArray)(exclude)) {
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
    if ((0, import_common8.isString)(json)) {
      try {
        json = JSON.parse(json);
      } catch (_e) {
        throw new Error("Invalid JSON String json parameter.");
      }
    }
    if (!(0, import_common8.isObject)(json)) {
      throw new Error("Invalid Object json parameter.");
    }
    const data = json;
    const tokenMap = data.tokens;
    if (!(0, import_common8.isObject)(tokenMap)) {
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
    if (!(0, import_common8.isString)(subject)) {
      throw new Error("Invalid string subject parameter");
    }
    const iter = (0, import_common8.isString)(iteratorName) ? this.iterator(iteratorName) : this.iterator();
    if (!iter) {
      throw new Error("Invalid Iterator parameter.");
    }
    if (!(0, import_common8.isObject)(reducer)) {
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
var import_common9 = require("@dikolab/common");
function load(json) {
  if ((0, import_common9.isString)(json)) {
    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error(
        "Unable to load from invalid json JSON String parameter: " + String(e)
      );
    }
  } else if (!(0, import_common9.isObject)(json)) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseIterator,
  Iterator,
  Lexeme,
  Parser,
  debug,
  define,
  isParser,
  load,
  registerIterator
});
//# sourceMappingURL=index.cjs.map
