import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isIterable
} from "./chunk-5SF2O7CR.mjs";
import {
  isMethod
} from "./chunk-JAESEHZ5.mjs";

// src/processor/functions/runner.function.ts
var NAME_RE = /^(([^.]+\.)*)((before|after):)?([a-zA-Z0-9_\-.]+)$/;
var POSITION_BEFORE = 1;
var POSITION_AFTER = 2;
var RUNNERS = {};
var NAMESPACES = {};
var INVALID_NAME = "Invalid [name] parameter.";
var INVALID_HANDLER = "Invalid [handler] parameter.";
function parseName(name) {
  const match = isString(name) && name.match(NAME_RE);
  if (match) {
    const namespace = match[1];
    const position = match[4] === "before" ? POSITION_BEFORE : POSITION_AFTER;
    return [position, (namespace || "") + match[5]];
  }
  return void 0;
}
function getPositionAccess(input) {
  return input === POSITION_BEFORE ? "before" : "after";
}
function getRunners(name) {
  const list = RUNNERS;
  const parsed = parseName(name);
  if (parsed) {
    const access = ":" + parsed[1];
    if (access in list) {
      const position = parsed[0];
      return [
        list[access],
        getPositionAccess(position),
        position
      ];
    }
  }
  return void 0;
}
function get(name) {
  const info = getRunners(name);
  if (info) {
    return info[0][info[1]];
  }
  return void 0;
}
function purgeRunners(name, after) {
  const info = getRunners(name);
  if (info) {
    let access;
    switch (after) {
      case true:
        access = "after";
        break;
      case false:
        access = "before";
        break;
      default:
        access = false;
    }
    if (!access || access === "before") {
      const runners = info[0].before;
      runners.splice(0, runners.length);
    }
    if (!access || access === "after") {
      const runners = info[0].after;
      runners.splice(0, runners.length);
    }
  }
}
function run(name, args, scope) {
  if (!isString(name)) {
    throw new Error(INVALID_NAME);
  }
  const runners = get(name);
  if (runners) {
    const resolvedScope = scope === void 0 ? null : scope;
    let resolvedArgs = isIterable(args) ? Array.prototype.slice.call(args, 0) : [];
    let result;
    for (let c = 0; c < runners.length; c++) {
      result = runners[c].apply(
        resolvedScope,
        resolvedArgs
      );
      if (result !== void 0) {
        resolvedArgs = [result];
      }
    }
    resolvedArgs.splice(0, resolvedArgs.length);
    return result;
  }
  return void 0;
}
function register(name, handler) {
  const list = RUNNERS;
  if (!isString(name)) {
    throw new Error(INVALID_NAME);
  }
  const parsed = parseName(name);
  if (!isMethod(handler)) {
    throw new Error(INVALID_HANDLER);
  }
  if (parsed) {
    const resolvedName = parsed[1];
    const access = ":" + resolvedName;
    if (!(access in list)) {
      list[access] = {
        name: resolvedName,
        before: [],
        after: []
      };
    }
    const items = list[access][getPositionAccess(parsed[0])];
    items[items.length] = handler;
  }
}
function clearRunner(name, after) {
  if (!isString(name)) {
    throw new Error(INVALID_NAME);
  }
  purgeRunners(name, after);
}
function middleware(name) {
  const list = NAMESPACES;
  if (!isString(name)) {
    throw new Error(INVALID_NAME);
  }
  const access = name + ".";
  if (!(access in list)) {
    list[access] = new BaseMiddleware(access);
  }
  return list[access];
}

// src/processor/classes/base-middleware.class.ts
var BaseMiddleware = class {
  access;
  /**
   * Creates a new BaseMiddleware
   *
   * @param access - Namespace prefix
   */
  constructor(access) {
    this.access = access;
  }
  /**
   * Runs handlers for a namespaced runner
   *
   * @param name - Runner name
   * @param args - Arguments to pass
   * @param scope - Execution context
   * @returns Result from handler chain
   */
  run(name, args, scope) {
    return run(this.access + name, args, scope);
  }
  /**
   * Registers a handler in this namespace
   *
   * @param name - Runner name
   * @param handler - Callback to register
   * @returns This middleware instance
   */
  register(name, handler) {
    register(this.access + name, handler);
    return this;
  }
  /**
   * Clears handlers for a namespaced runner
   *
   * @param name - Runner name
   * @param after - If true, clear only
   *   after-handlers
   * @returns This middleware instance
   */
  clear(name, after) {
    if (!isString(name)) {
      throw new Error("Invalid [name] parameter.");
    }
    clearRunner(this.access + name, after);
    return this;
  }
};

export {
  BaseMiddleware,
  run,
  register,
  clearRunner,
  middleware
};
//# sourceMappingURL=chunk-STXSESJB.mjs.map
