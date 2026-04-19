// src/regex/constants/operators.constant.ts
var ENCLOSED_START = 2;
var ENCLOSED_END = 3;
var BINARY = 4;
var POSTFIX = 5;
var FINAL = 6;
var OPERATOR = {
  "[": [ENCLOSED_START, 15, "]"],
  "[^": [ENCLOSED_START, 15, "]^"],
  "]": [ENCLOSED_END, 1, "[]"],
  "]^": [ENCLOSED_END, 1, "[^]"],
  "(": [ENCLOSED_START, 15, ")"],
  ")": [ENCLOSED_END, 1, "()"],
  "?": [POSTFIX, 10],
  "+": [POSTFIX, 10],
  "*": [POSTFIX, 10],
  range: [POSTFIX, 10],
  "-": [BINARY, 7],
  "^-": [BINARY, 7],
  "^,": [BINARY, 5],
  ",": [BINARY, 5],
  ".": [BINARY, 5],
  "|": [BINARY, 3],
  $$: [FINAL, 1]
};
var ENCLOSED_CLASS_REPLACE = {
  "[": "char",
  "[^": "char",
  "?": "char",
  "+": "char",
  "*": "char",
  ",": "char",
  "|": "char",
  "(": "char",
  ")": "char"
};
var ENCLOSED_REPLACE = {
  "[": ENCLOSED_CLASS_REPLACE,
  "[^": ENCLOSED_CLASS_REPLACE,
  "(": {
    "-": "char"
  }
};

export {
  ENCLOSED_START,
  ENCLOSED_END,
  BINARY,
  POSTFIX,
  FINAL,
  OPERATOR,
  ENCLOSED_REPLACE
};
//# sourceMappingURL=chunk-UH5XYUDV.mjs.map
