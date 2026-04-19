import {
  ItemPointer
} from "../../../chunk-A6547O5A.mjs";

// src/state/define/classes/item.class.ts
var Item = class _Item {
  map;
  state;
  base;
  watched = [];
  reduceList = [];
  recursion;
  appliedRecursion = {};
  references = [];
  observed = [];
  nextInQueue = null;
  parent = null;
  pointer = null;
  finalized = false;
  constructor(map, recursion, id) {
    const list = map.rawStates;
    this.map = map;
    this.state = id || map.generateState();
    this.base = this;
    this.recursion = recursion;
    list[list.length] = this;
  }
  getRecursionItem(ruleId) {
    const recursion = this.recursion;
    return ruleId in recursion ? recursion[ruleId] : null;
  }
  hasRecursion(ruleId) {
    const recursion = this.recursion;
    return ruleId in recursion ? recursion[ruleId] : null;
  }
  setRecursion(ruleId) {
    const recursion = this.recursion;
    recursion[ruleId] = this;
    return this;
  }
  getPointerItem(lexeme) {
    let pointer = this.pointer;
    for (; pointer; pointer = pointer.next) {
      if (pointer.item === lexeme) {
        return pointer.to;
      }
    }
    return null;
  }
  point(lexeme, ruleId) {
    let found = this.getPointerItem(lexeme);
    if (!found) {
      const recursion = this.recursion;
      found = new _Item(this.map, recursion);
      found.recursion = recursion;
      this.onSetPointer(new ItemPointer(lexeme, found, ruleId));
      const list = this.watched;
      for (let c = -1, len = list.length; len--; ) {
        const item = list[++c];
        const has = item.getPointerItem(lexeme);
        if (!has) {
          item.onSetPointer(
            new ItemPointer(lexeme, found, ruleId)
          );
        }
      }
    }
    return found;
  }
  onSetPointer(pointer) {
    let last = this.pointer;
    if (last) {
      for (; last.next; last = last.next) {
      }
      last.next = pointer;
    } else {
      this.base.pointer = pointer;
    }
  }
  observe(item, ruleId) {
    const list = this.observed;
    if (item !== this) {
      list[list.length] = [item, ruleId];
    }
  }
  finalizeObserved() {
    const list = this.observed;
    let c = -1;
    let l = list.length;
    for (; l--; ) {
      const item = list[++c][0];
      for (let pointer = this.pointer; pointer; pointer = pointer.next) {
        const lexeme = pointer.item;
        const currentPointer = item.getPointerItem(lexeme);
        if (!currentPointer) {
          item.onSetPointer(
            new ItemPointer(lexeme, pointer.to, pointer.ruleIds)
          );
        }
      }
    }
  }
  finalize() {
    const map = this.map;
    const id = this.state;
    const stateObject = map.states[id];
    let item = this.pointer;
    for (; item; item = item.next) {
      const lexeme = item.item;
      if (!(lexeme in stateObject)) {
        stateObject[lexeme] = item.to.state;
      }
    }
    const list = this.reduceList;
    for (let c = -1, len = list.length; len--; ) {
      const reduceItem = list[++c];
      map.setReduceState(
        id,
        reduceItem[0],
        reduceItem[1],
        reduceItem[2]
      );
    }
  }
  reduce(production, params, group) {
    const list = this.reduceList;
    list[list.length] = [production, params, group];
  }
};
export {
  Item
};
//# sourceMappingURL=item.class.mjs.map
