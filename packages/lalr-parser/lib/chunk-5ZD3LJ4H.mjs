import {
  defineRules,
  defineTerminals,
  isTerminal
} from "./chunk-VRVDIL3R.mjs";
import {
  Registry
} from "./chunk-TDMQKTB7.mjs";
import {
  define
} from "./chunk-S7GQAONK.mjs";

// src/state/builder/functions/build.function.ts
import { isString, isArray, isRegex } from "@dikolab/common";
function build(root, map, tokenizer, definitions, exclude) {
  let name = null;
  let terminalDefinition = true;
  map.reset();
  map.setRoot(root);
  const registry = new Registry(map, tokenizer);
  definitions.splice(
    definitions.length,
    0,
    map.lookupSymbol(map.augmentedRoot),
    [[root, map.lookupSymbol(map.endSymbol)]]
  );
  for (let c = -1, l = definitions.length; l--; ) {
    const definition = definitions[++c];
    if (isString(definition)) {
      terminalDefinition = isTerminal(definition);
      name = map.generateSymbol(definition);
    } else if (name && isArray(definition)) {
      if (terminalDefinition) {
        defineTerminals(registry, name, definition);
      } else {
        defineRules(registry, name, definition);
      }
    } else {
      throw new Error("Invalid item in definitions parameter.");
    }
  }
  define(registry);
  if (isArray(exclude)) {
    const excludes = [];
    const excludeArr = exclude;
    for (let c = -1, l = excludeArr.length; l--; ) {
      let definition = excludeArr[++c];
      if (isRegex(definition)) {
        definition = registry.registerTerminal(definition);
      } else if (isString(definition)) {
        definition = map.generateSymbol(definition);
      } else {
        throw new Error(
          "Invalid [exclude] pattern parameter."
        );
      }
      excludes[c] = definition;
    }
    map.setExcludes(excludes);
  }
  return true;
}

export {
  build
};
//# sourceMappingURL=chunk-5ZD3LJ4H.mjs.map
