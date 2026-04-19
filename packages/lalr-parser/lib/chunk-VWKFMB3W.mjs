// src/state/classes/state-map.class.ts
import { isString, isObject, isArray, contains } from "@dikolab/common";
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
  constructor(debug) {
    this.init(debug);
  }
  init(debug) {
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
    this.debugMode = debug === true;
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

export {
  StateMap
};
//# sourceMappingURL=chunk-VWKFMB3W.mjs.map
