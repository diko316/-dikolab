import {
  Scope
} from "./chunk-SP2WHBVZ.mjs";
import {
  createBoundaryNameDetails
} from "./chunk-3N4THWK6.mjs";
import {
  defineBoundary
} from "./chunk-LUVUVEAV.mjs";

// src/definition/functions/define-scope.function.ts
function defineScope(name) {
  const [type, title] = createBoundaryNameDetails(name);
  const boundary = defineBoundary(type, title);
  return new Scope(boundary);
}

export {
  defineScope
};
//# sourceMappingURL=chunk-BOMZK7NN.mjs.map
