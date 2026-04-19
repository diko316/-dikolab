import {
  END,
  END_EMPTY,
  QUEUE,
  START,
  START_ESCAPED,
  STATE,
  STATE_ACTION
} from "./chunk-PMCNS5K4.mjs";
import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isMethod
} from "./chunk-JAESEHZ5.mjs";

// src/json-path/functions/json-each.function.ts
var ERROR_PATH_INVALID = "Invalid [path] parameter.";
function jsonEach(path, callback, arg1, arg2, arg3, arg4, arg5) {
  if (!isString(path)) {
    throw new Error(ERROR_PATH_INVALID);
  }
  if (!isMethod(callback)) {
    throw new Error("Invalid [callback] parameter");
  }
  let buffer = false;
  let bl = 0;
  let state = "start";
  let stateObject = STATE.start;
  const items = [];
  let len = 0;
  let pending = 0;
  for (let c = 0; c < path.length; c++) {
    const chr = path.charAt(c);
    const last = c === path.length - 1;
    let next;
    if (chr in stateObject) {
      next = stateObject[chr];
    } else if ("default" in stateObject) {
      next = stateObject.default;
    } else {
      return null;
    }
    if (state in STATE_ACTION) {
      const actionObject = STATE_ACTION[state];
      if (next in actionObject) {
        let startQueue = false;
        switch (actionObject[next]) {
          case START:
            startQueue = true;
          // falls through
          case START_ESCAPED:
            if (buffer !== false) {
              return false;
            }
            if (startQueue && !last) {
              buffer = [chr];
              bl = 1;
            } else {
              buffer = [];
              bl = 0;
            }
            if (!last) {
              break;
            }
          // falls through
          case QUEUE:
            if (buffer === false) {
              return false;
            }
            buffer[bl++] = chr;
            if (!last) {
              break;
            }
          // falls through
          case END:
            if (buffer === false) {
              return false;
            }
            items[len++] = buffer.join("");
            buffer = false;
            bl = 0;
            break;
          case END_EMPTY:
            if (buffer !== false) {
              return false;
            }
            items[len++] = "";
            break;
        }
      }
    }
    state = next;
    stateObject = STATE[state];
    if (pending < len - 1) {
      if (callback(
        items[pending++],
        false,
        arg1,
        arg2,
        arg3,
        arg4,
        arg5
      ) === false) {
        return true;
      }
    }
    if (last) {
      let remaining = len - pending;
      for (; remaining--; ) {
        if (callback(
          items[pending++],
          !remaining,
          arg1,
          arg2,
          arg3,
          arg4,
          arg5
        ) === false) {
          return true;
        }
      }
      break;
    }
  }
  return true;
}

export {
  jsonEach
};
//# sourceMappingURL=chunk-LMSKAPRD.mjs.map
