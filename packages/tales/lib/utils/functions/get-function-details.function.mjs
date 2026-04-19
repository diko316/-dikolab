import {
  FUNCTION_TO_STRING_PATTERN
} from "../../chunk-7GV7V6DU.mjs";

// src/utils/functions/get-function-details.function.ts
function getFunctionDetails(fn) {
  const matches = fn.toString().match(FUNCTION_TO_STRING_PATTERN) || [
    "",
    ""
  ];
  return [fn.name, matches[2]];
}
export {
  getFunctionDetails
};
//# sourceMappingURL=get-function-details.function.mjs.map
