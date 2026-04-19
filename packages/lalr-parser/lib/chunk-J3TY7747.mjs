import {
  Parser
} from "./chunk-WINDIXJ5.mjs";

// src/parser/functions/load.function.ts
import { isString, isObject } from "@dikolab/common";
function load(json) {
  if (isString(json)) {
    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error(
        "Unable to load from invalid json JSON String parameter: " + String(e)
      );
    }
  } else if (!isObject(json)) {
    throw new Error(
      "Unable to load from invalid json Object parameter."
    );
  }
  const parser = new Parser();
  try {
    parser.fromJSON(json);
  } catch (e) {
    throw new Error(String(e));
  }
  return parser;
}

export {
  load
};
//# sourceMappingURL=chunk-J3TY7747.mjs.map
