import {
  IAmChain
} from "./chunk-BUUJT3P6.mjs";

// src/definition/functions/i-am.function.ts
function iAm(name) {
  if (!name || typeof name !== "string") {
    throw new TypeError(`"${name}" name parameter is invald.`);
  }
  return new IAmChain(name);
}

export {
  iAm
};
//# sourceMappingURL=chunk-ETJKBBBA.mjs.map
