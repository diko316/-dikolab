import {
  Actor
} from "./chunk-UNVUUG3R.mjs";
import {
  Transaction
} from "./chunk-U34HEQOR.mjs";
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
//# sourceMappingURL=chunk-PH4S3D2F.mjs.map
