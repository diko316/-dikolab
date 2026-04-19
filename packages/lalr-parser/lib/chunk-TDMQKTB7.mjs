// src/state/builder/classes/registry.class.ts
import { isString, contains } from "@dikolab/common";
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

export {
  Registry
};
//# sourceMappingURL=chunk-TDMQKTB7.mjs.map
