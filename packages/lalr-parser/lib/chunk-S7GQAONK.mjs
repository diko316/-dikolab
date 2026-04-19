import {
  DefineList
} from "./chunk-QY2TQZZS.mjs";
import {
  DefineState
} from "./chunk-WTNUEIQA.mjs";

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

export {
  define
};
//# sourceMappingURL=chunk-S7GQAONK.mjs.map
