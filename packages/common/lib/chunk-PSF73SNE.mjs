import {
  isMethod
} from "./chunk-JAESEHZ5.mjs";

// src/processor/functions/set-async.function.ts
var G = globalThis;
var hasSetImmediate = typeof G.setImmediate === "function";
function setAsync(handler) {
  if (!isMethod(handler)) {
    throw new Error("Invalid [handler] parameter.");
  }
  if (hasSetImmediate) {
    return G.setImmediate(handler);
  }
  return G.setTimeout(handler, 1);
}
function clearAsync(id) {
  try {
    if (hasSetImmediate) {
      G.clearImmediate(id);
    } else {
      G.clearTimeout(id);
    }
  } catch (_e) {
  }
}

export {
  setAsync,
  clearAsync
};
//# sourceMappingURL=chunk-PSF73SNE.mjs.map
