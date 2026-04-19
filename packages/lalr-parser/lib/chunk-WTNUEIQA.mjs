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

export {
  DefineState
};
//# sourceMappingURL=chunk-WTNUEIQA.mjs.map
