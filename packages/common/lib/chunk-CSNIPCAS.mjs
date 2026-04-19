import {
  jsonEach
} from "./chunk-LMSKAPRD.mjs";

// src/json-path/functions/json-parse-path.function.ts
function onParsePath(property, _last, context) {
  context[context.length] = property;
}
function jsonParsePath(path) {
  const items = [];
  return jsonEach(path, onParsePath, items) && items.length ? items : null;
}

export {
  jsonParsePath
};
//# sourceMappingURL=chunk-CSNIPCAS.mjs.map
