import {
  Actor
} from "./chunk-MMNDPSU3.mjs";
import {
  Transaction
} from "./chunk-3MNWHTWN.mjs";
import {
  emitSymbolEvent
} from "./chunk-G5NCA5HY.mjs";

// src/execution/functions/assume.function.ts
function assume(actor) {
  const transaction = new Transaction({}, actor);
  if (actor instanceof Actor) {
    emitSymbolEvent(actor, "assume", actor);
  }
  return transaction;
}

export {
  assume
};
//# sourceMappingURL=chunk-U223SJEA.mjs.map
