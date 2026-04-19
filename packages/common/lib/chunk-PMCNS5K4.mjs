// src/json-path/constants/json-state-machine.constant.ts
var START = "start";
var START_ESCAPED = "start_escaped";
var QUEUE = "queue";
var END = "end";
var END_EMPTY = "end_empty";
var STATE = {
  start: {
    "[": "bracket_start",
    "'": "any_sq_start",
    '"': "any_dq_start",
    default: "any",
    "\\": "any_escape"
  },
  bracket_start: {
    "]": "property_end",
    "'": "sq_start",
    '"': "dq_start",
    default: "bracket_any"
  },
  any_sq_start: {
    "'": "property_end",
    "\\": "any_sq_escape",
    default: "any_sq"
  },
  any_sq: {
    "'": "property_end",
    "\\": "any_sq_escape",
    default: "any_sq"
  },
  any_sq_escape: {
    default: "any_sq"
  },
  any_dq_start: {
    '"': "property_end",
    "\\": "any_dq_escape",
    default: "any_dq"
  },
  any_dq: {
    '"': "property_end",
    "\\": "any_dq_escape",
    default: "any_dq"
  },
  any_dq_escape: {
    default: "any_dq"
  },
  sq_start: {
    "'": "bracket_end",
    "\\": "sq_escape",
    default: "sq"
  },
  sq: {
    "'": "bracket_end",
    "\\": "sq_escape",
    default: "sq"
  },
  sq_escape: {
    default: "sq"
  },
  dq_start: {
    '"': "bracket_end",
    "\\": "dq_escape",
    default: "dq"
  },
  dq: {
    '"': "bracket_end",
    "\\": "dq_escape",
    default: "dq"
  },
  dq_escape: {
    default: "dq"
  },
  bracket_any: {
    "]": "property_end",
    "\\": "bracket_any_escape",
    default: "bracket_any"
  },
  bracket_any_escape: {
    default: "bracket_any"
  },
  bracket_end: {
    "]": "property_end"
  },
  any: {
    ".": "start",
    "\\": "any_escape",
    "[": "bracket_start",
    default: "any"
  },
  any_escape: {
    default: "any"
  },
  property_end: {
    "[": "bracket_start",
    ".": "start"
  }
};
var STATE_ACTION = {
  start: {
    any: START,
    any_escape: START_ESCAPED
  },
  any_sq_start: {
    any_sq: START,
    property_end: END_EMPTY
  },
  any_sq: {
    any_sq: QUEUE,
    property_end: END
  },
  any_sq_escape: {
    any_sq: QUEUE
  },
  any_dq_start: {
    any_dq: START,
    property_end: END_EMPTY
  },
  any_dq: {
    any_dq: QUEUE,
    property_end: END
  },
  any_dq_escape: {
    any_dq: QUEUE
  },
  any: {
    any: QUEUE,
    start: END,
    bracket_start: END
  },
  any_escape: {
    any: QUEUE,
    bracket_start: END,
    start: START
  },
  bracket_start: {
    bracket_any: START,
    property_end: END_EMPTY
  },
  bracket_any: {
    bracket_any: QUEUE,
    property_end: END
  },
  bracket_any_escape: {
    bracket_any: QUEUE
  },
  sq_start: {
    sq: START,
    bracket_end: END_EMPTY
  },
  sq: {
    sq: QUEUE,
    bracket_end: END
  },
  sq_escape: {
    sq: QUEUE
  },
  dq_start: {
    dq: START,
    bracket_end: END_EMPTY
  },
  dq: {
    dq: QUEUE,
    bracket_end: END
  },
  dq_escape: {
    dq: QUEUE
  }
};

export {
  START,
  START_ESCAPED,
  QUEUE,
  END,
  END_EMPTY,
  STATE,
  STATE_ACTION
};
//# sourceMappingURL=chunk-PMCNS5K4.mjs.map
