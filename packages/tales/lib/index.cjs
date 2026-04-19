var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Actor: () => Actor,
  Boundary: () => Boundary,
  Goal: () => Goal,
  Role: () => Role,
  Transaction: () => Transaction,
  Usecase: () => Usecase,
  assume: () => assume,
  clearAllListeners: () => clearAllSymbolListeners,
  clearListeners: () => clearSymbolEventListeners,
  clearMockeUsecaseHandler: () => clearMockeUsecaseHandler,
  clearSymbols: () => clearSymbols,
  defineScope: () => defineScope,
  iAm: () => iAm,
  listen: () => listenSymbolEvent,
  mockUsecaseHandler: () => mockUsecaseHandler,
  unlisten: () => unlistenSymbolEvent
});
module.exports = __toCommonJS(index_exports);

// src/definition/classes/iam-chain.class.ts
var import_private_parts3 = require("@dikolab/private-parts");

// src/utils/constants/symbol-keys.constant.ts
var ID_KEY = Symbol("ID");
var NAME_KEY = Symbol("Name");
var TYPE_KEY = Symbol("Type");
var EVENT_KEY = Symbol("Event Emitter");
var TITLE_KEY = Symbol("Title");
var ACTOR_KEY = Symbol("Actor");
var ROLE_KEY = Symbol("Role");
var ROLES_KEY = Symbol("Roles");
var ROLE_NAMES_KEY = Symbol("Role Names");
var BOUNDARY_KEY = Symbol("Boundary");
var SUBTYPE_KEY = Symbol("Subtype");
var STATE_KEY = Symbol("State");
var GOAL_KEY = Symbol("Goal");
var GOAL_HANDLER_KEY = Symbol("Goal Handler");
var HANDLER_KEY = Symbol("Handler");
var MOCK_HANDLER_KEY = Symbol("Mock Handler");
var USECASE_KEY = Symbol("Usecase");
var STORY_KEY = Symbol("Story");
var TRANSACTION_SESSION = Symbol(
  "Transaction Session"
);
var TRANSACTION_SIGNATURE = Symbol(
  "Transaction Signature"
);

// src/actor/classes/actor.class.ts
var import_private_parts2 = require("@dikolab/private-parts");

// src/symbol/classes/usecase-symbol.class.ts
var import_private_parts = require("@dikolab/private-parts");

// src/symbol/constants/symbol-lookup.constant.ts
var SYMBOL_LOOKUP = /* @__PURE__ */ new Map();

// src/symbol/functions/create-symbol-id.function.ts
function createSymbolId(typeOrId, name) {
  if (typeof name === "string") {
    return `${typeOrId}<${name}>`;
  }
  return typeOrId;
}

// src/event/constants/event-keys.ts
var EVENT_EMITTER_KEY = Symbol("Event Emitter");
var EVENT_EMIT_KEY = Symbol("Emit Event");

// src/symbol/classes/usecase-symbol.class.ts
var import_events = __toESM(require("events"), 1);
var UsecaseSymbol = class {
  get [TYPE_KEY]() {
    return (0, import_private_parts.get)(this, TYPE_KEY);
  }
  get [NAME_KEY]() {
    return (0, import_private_parts.get)(this, NAME_KEY);
  }
  get [ID_KEY]() {
    return (0, import_private_parts.get)(this, ID_KEY);
  }
  get [EVENT_EMITTER_KEY]() {
    return (0, import_private_parts.get)(this, EVENT_EMITTER_KEY);
  }
  constructor(type, name) {
    const id = createSymbolId(type, name);
    if (SYMBOL_LOOKUP.has(id)) {
      throw new ReferenceError(`Symbol ${id} already exist.`);
    }
    (0, import_private_parts.set)(
      this,
      EVENT_EMITTER_KEY,
      new import_events.default({
        captureRejections: true
      })
    );
    (0, import_private_parts.set)(this, TYPE_KEY, type);
    (0, import_private_parts.set)(this, NAME_KEY, name);
    (0, import_private_parts.set)(this, ID_KEY, id);
    SYMBOL_LOOKUP.set(id, this);
  }
  /** Returns the symbol's unique identifier */
  toString() {
    return this[ID_KEY];
  }
  /** Returns a plain object with type and name */
  toJSON() {
    return {
      type: this[TYPE_KEY],
      name: this[NAME_KEY]
    };
  }
};

// src/utils/constants/symbol-tag.constant.ts
var ACTOR_TYPE = "Actor";
var ROLE_TYPE = "Role";
var BOUNDARY_TYPE = "Boundary";
var USECASE_TYPE = "Usecase";
var GOAL_TYPE = "Goal";

// src/actor/classes/actor.class.ts
var Actor = class extends UsecaseSymbol {
  get [ROLES_KEY]() {
    return (0, import_private_parts2.get)(this, ROLES_KEY);
  }
  constructor(name, roles) {
    super(ACTOR_TYPE, name);
    (0, import_private_parts2.set)(this, ROLES_KEY, roles);
  }
  /** Returns a plain object with type, name, and role names */
  toJSON() {
    const roles = this[ROLES_KEY].map((role) => role[NAME_KEY]);
    return {
      ...super.toJSON(),
      roles
    };
  }
};

// src/actor/classes/role.class.ts
var Role = class extends UsecaseSymbol {
  constructor(name) {
    super(ROLE_TYPE, name);
  }
};

// src/actor/functions/define-role.function.ts
function defineRole(name) {
  return new Role(name);
}

// src/symbol/functions/get-symbol-by-id.function.ts
function getSymbolById(typeOrId, name) {
  const fullId = typeof name === "string" ? createSymbolId(typeOrId, name) : createSymbolId(typeOrId);
  if (SYMBOL_LOOKUP.has(fullId)) {
    return SYMBOL_LOOKUP.get(fullId);
  }
  return null;
}

// src/actor/functions/get-or-define-roles.function.ts
function getOrDefineRoles(...roleNames) {
  return roleNames.map((name) => {
    if (typeof name !== "string") {
      throw new TypeError(
        `"${String(name)}" in roleNames parameter is invalid.`
      );
    }
    return getSymbolById(ROLE_TYPE, name) || defineRole(name);
  });
}

// src/actor/functions/define-actor.function.ts
function defineActor(name, ...roleOrNames) {
  if (!name || typeof name !== "string") {
    throw new TypeError(`"${name}" name parameter is invald.`);
  }
  const [role] = getOrDefineRoles(name);
  const others = getOrDefineRoles(
    ...roleOrNames
  );
  const roles = [role, ...others];
  return new Actor(name, roles);
}

// src/definition/classes/iam-chain.class.ts
var IAmChain = class {
  get [TITLE_KEY]() {
    return (0, import_private_parts3.get)(this, TITLE_KEY);
  }
  constructor(actorName) {
    (0, import_private_parts3.set)(this, TITLE_KEY, actorName);
  }
  /**
   * Defines an Actor with the given Roles.
   *
   * @param roles Roles to attach
   * @returns Actor
   */
  as(...roles) {
    return defineActor(this[TITLE_KEY], ...roles);
  }
};

// src/definition/functions/i-am.function.ts
function iAm(name) {
  if (!name || typeof name !== "string") {
    throw new TypeError(`"${name}" name parameter is invald.`);
  }
  return new IAmChain(name);
}

// src/boundary/functions/create-boundary-name-details.function.ts
var BOUNDARY_NAME_PATTERN = /^([^:]+):(.+)$/;
function createBoundaryNameDetails(name) {
  if (!BOUNDARY_NAME_PATTERN.test(name)) {
    throw new SyntaxError(`${name} Boundary Name is malformed.`);
  }
  const [rawType, rawTitle] = name.match(BOUNDARY_NAME_PATTERN)?.slice(1) || ["", ""];
  const type = rawType.trim();
  const title = rawTitle.trim();
  const id = `${type}:${title}`;
  return [type, title, id];
}

// src/boundary/classes/boundary.class.ts
var import_private_parts4 = require("@dikolab/private-parts");
var Boundary = class extends UsecaseSymbol {
  get [SUBTYPE_KEY]() {
    return (0, import_private_parts4.get)(this, SUBTYPE_KEY);
  }
  get [TITLE_KEY]() {
    return (0, import_private_parts4.get)(this, TITLE_KEY);
  }
  constructor(type, title) {
    super(BOUNDARY_TYPE, `${type}:${title}`);
    (0, import_private_parts4.set)(this, SUBTYPE_KEY, type);
    (0, import_private_parts4.set)(this, TITLE_KEY, title);
  }
  /** Returns a plain object with type, name, and subtype */
  toJSON() {
    return {
      ...super.toJSON(),
      subtype: this[SUBTYPE_KEY]
    };
  }
};

// src/boundary/functions/define-boundary.function.ts
function defineBoundary(type, title) {
  return new Boundary(type, title);
}

// src/definition/classes/scope.class.ts
var import_private_parts14 = require("@dikolab/private-parts");

// src/goal/classes/goal.class.ts
var import_private_parts5 = require("@dikolab/private-parts");

// src/goal/functions/create-goal-name.function.ts
function createGoalName(title, boundary) {
  const boundaryName = boundary[NAME_KEY];
  return `${boundaryName}-${title}`;
}

// src/goal/classes/goal.class.ts
var Goal = class extends UsecaseSymbol {
  get [TITLE_KEY]() {
    return (0, import_private_parts5.get)(this, TITLE_KEY);
  }
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts5.get)(this, BOUNDARY_KEY);
  }
  constructor(title, boundary) {
    super(GOAL_TYPE, createGoalName(title, boundary));
    (0, import_private_parts5.set)(this, TITLE_KEY, title);
    (0, import_private_parts5.set)(this, BOUNDARY_KEY, boundary);
  }
};

// src/goal/functions/define-goal.function.ts
function defineGoal(title, boundary) {
  return new Goal(title, boundary);
}

// src/definition/classes/as-chain.class.ts
var import_private_parts13 = require("@dikolab/private-parts");

// src/definition/classes/as-i-can-chain.class.ts
var import_private_parts12 = require("@dikolab/private-parts");

// src/definition/classes/as-i-can-so-that-chain.class.ts
var import_private_parts11 = require("@dikolab/private-parts");

// src/usecase/classes/usecase.class.ts
var import_private_parts10 = require("@dikolab/private-parts");

// src/actor/functions/get-role-name.function.ts
var import_private_parts6 = require("@dikolab/private-parts");
function getRoleName(role) {
  return (0, import_private_parts6.get)(role, NAME_KEY);
}

// src/boundary/functions/get-boundary-name.function.ts
var import_private_parts7 = require("@dikolab/private-parts");
function getBoundaryName(boundary) {
  return (0, import_private_parts7.get)(boundary, NAME_KEY);
}

// src/goal/functions/get-goal-boundary.function.ts
var import_private_parts8 = require("@dikolab/private-parts");
function getGoalBoundary(goal) {
  return (0, import_private_parts8.get)(goal, BOUNDARY_KEY);
}

// src/goal/functions/get-goal-title.funciton.ts
var import_private_parts9 = require("@dikolab/private-parts");
function getGoalTitle(goal) {
  return (0, import_private_parts9.get)(goal, TITLE_KEY);
}

// src/usecase/functions/create-usecase-title.function.ts
function createUsecaseTitle(title, goal, ...roles) {
  const rolesNames = roles.map((role) => getRoleName(role)).join(",");
  const goalTitle = getGoalTitle(goal);
  const boundaryName = getBoundaryName(getGoalBoundary(goal));
  return `As Role<${rolesNames}>, I can ${title} in ${boundaryName}. So that, ${goalTitle}`;
}

// src/symbol/functions/get-symbol-name.function.ts
function getSymbolName(usecaseSymbol) {
  return usecaseSymbol[NAME_KEY];
}

// src/usecase/classes/usecase.class.ts
var Usecase = class extends UsecaseSymbol {
  get [TITLE_KEY]() {
    return (0, import_private_parts10.get)(this, TITLE_KEY);
  }
  get [ROLES_KEY]() {
    return (0, import_private_parts10.get)(this, ROLES_KEY);
  }
  get [GOAL_KEY]() {
    return (0, import_private_parts10.get)(this, GOAL_KEY);
  }
  get [HANDLER_KEY]() {
    return (0, import_private_parts10.get)(this, HANDLER_KEY);
  }
  get [MOCK_HANDLER_KEY]() {
    return (0, import_private_parts10.get)(this, MOCK_HANDLER_KEY);
  }
  set [MOCK_HANDLER_KEY](handler) {
    (0, import_private_parts10.set)(this, MOCK_HANDLER_KEY, handler);
  }
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts10.get)(this[GOAL_KEY], BOUNDARY_KEY);
  }
  constructor(title, roles, goal, handler) {
    super(USECASE_TYPE, createUsecaseTitle(title, goal, ...roles));
    (0, import_private_parts10.set)(this, TITLE_KEY, title);
    (0, import_private_parts10.set)(this, ROLES_KEY, roles);
    (0, import_private_parts10.set)(this, HANDLER_KEY, handler);
    (0, import_private_parts10.set)(this, MOCK_HANDLER_KEY, null);
    (0, import_private_parts10.set)(this, GOAL_KEY, goal);
  }
  /** Returns the use case's display name */
  toString() {
    return getSymbolName(this);
  }
};

// src/usecase/functions/define-usecase.function.ts
function defineUsecase(title, roles, goal, handler) {
  return new Usecase(title, roles, goal, handler);
}

// src/definition/classes/as-i-can-so-that-chain.class.ts
var AsICanSoThatChain = class {
  // InBoundary
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts11.get)(this, BOUNDARY_KEY);
  }
  get [ROLE_NAMES_KEY]() {
    return (0, import_private_parts11.get)(this, ROLE_NAMES_KEY);
  }
  get [TITLE_KEY]() {
    return (0, import_private_parts11.get)(this, TITLE_KEY);
  }
  get [GOAL_KEY]() {
    return (0, import_private_parts11.get)(this, GOAL_KEY);
  }
  constructor(boundary, roleNames, title, goal) {
    (0, import_private_parts11.set)(this, BOUNDARY_KEY, boundary);
    (0, import_private_parts11.set)(this, ROLE_NAMES_KEY, roleNames);
    (0, import_private_parts11.set)(this, TITLE_KEY, title);
    (0, import_private_parts11.set)(this, GOAL_KEY, goal);
  }
  /**
   * Attaches handler function to be executed when Use-case is performed.
   *
   * @param handler Use-case execution handler function.
   * @returns Usecase
   */
  implementedAs(handler) {
    const roles = getOrDefineRoles(
      ...this[ROLE_NAMES_KEY]
    );
    const title = this[TITLE_KEY];
    const goal = this[GOAL_KEY];
    return defineUsecase(title, roles, goal, handler);
  }
};

// src/definition/classes/as-i-can-chain.class.ts
var AsICanChain = class {
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts12.get)(this, BOUNDARY_KEY);
  }
  get [ROLE_NAMES_KEY]() {
    return (0, import_private_parts12.get)(this, ROLE_NAMES_KEY);
  }
  get [TITLE_KEY]() {
    return (0, import_private_parts12.get)(this, TITLE_KEY);
  }
  constructor(boundary, roleNames, title) {
    (0, import_private_parts12.set)(this, BOUNDARY_KEY, boundary);
    (0, import_private_parts12.set)(this, ROLE_NAMES_KEY, roleNames);
    (0, import_private_parts12.set)(this, TITLE_KEY, title);
  }
  /**
   * Assigns Goal of the Use-case
   *
   * @param goal The goal of the Use-case.
   * @returns declaration chain
   */
  soThat(goal) {
    return new AsICanSoThatChain(
      this[BOUNDARY_KEY],
      this[ROLE_NAMES_KEY],
      this[TITLE_KEY],
      goal
    );
  }
};

// src/definition/classes/as-chain.class.ts
var AsChain = class {
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts13.get)(this, BOUNDARY_KEY);
  }
  get [ROLE_NAMES_KEY]() {
    return (0, import_private_parts13.get)(this, ROLE_NAMES_KEY);
  }
  constructor(boundary, roleNames) {
    (0, import_private_parts13.set)(this, BOUNDARY_KEY, boundary);
    (0, import_private_parts13.set)(this, ROLE_NAMES_KEY, roleNames);
  }
  /**
   * Declares text title of the Use-case.
   *
   * @param title Text title of the Use-case
   * @returns declaration chain
   */
  iCan(title) {
    return new AsICanChain(
      this[BOUNDARY_KEY],
      this[ROLE_NAMES_KEY],
      title
    );
  }
};

// src/definition/classes/scope.class.ts
var Scope = class {
  get [BOUNDARY_KEY]() {
    return (0, import_private_parts14.get)(this, BOUNDARY_KEY);
  }
  constructor(boundary) {
    (0, import_private_parts14.set)(this, BOUNDARY_KEY, boundary);
  }
  /**
   * Creates Goal to be used for declaring a Use-case
   *
   * @param title Unique goal title of what you want to achieve.
   * @returns Goal
   */
  defineGoal(title) {
    return defineGoal(title, this[BOUNDARY_KEY]);
  }
  /**
   * Creates declaration of Roles that guards the Use-case execution
   *
   * @param roles Role names or Roles included in the context
   * @returns declaration chain object
   */
  as(...roles) {
    const roleNames = roles.map((roleOrName) => {
      if (typeof roleOrName === "string") {
        return roleOrName;
      }
      if (roleOrName instanceof Role) {
        return roleOrName[NAME_KEY];
      }
      throw new TypeError("Role parameter is invalid.");
    });
    return new AsChain(this[BOUNDARY_KEY], roleNames);
  }
};

// src/definition/functions/define-scope.function.ts
function defineScope(name) {
  const [type, title] = createBoundaryNameDetails(name);
  const boundary = defineBoundary(type, title);
  return new Scope(boundary);
}

// src/symbol/functions/emit-symbol-event.function.ts
function emitSymbolEvent(symbol, type, ...args) {
  symbol[EVENT_EMITTER_KEY].emit(type, ...args);
}

// src/usecase/classes/transaction.class.ts
var import_private_parts16 = require("@dikolab/private-parts");

// src/actor/functions/intersect-roles.function.ts
function intersectRoles(pool, target) {
  const set13 = new WeakSet(pool);
  return target.filter((role) => set13.has(role));
}

// src/usecase/functions/is-actor-allow-to-perform.function.ts
function isActorAllowToPerform(actor, roles) {
  return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}

// src/usecase/functions/create-session-data.function.ts
var import_private_parts15 = require("@dikolab/private-parts");
function createSessionData(data) {
  return Object.keys(data).reduce(
    (newData, key) => {
      (0, import_private_parts15.set)(newData, key, data[key]);
      Object.defineProperty(newData, key, {
        enumerable: true,
        configurable: false,
        get() {
          return (0, import_private_parts15.get)(newData, key);
        }
      });
      return newData;
    },
    {}
  );
}

// src/usecase/classes/transaction.class.ts
var Transaction = class _Transaction {
  [TRANSACTION_SIGNATURE] = 1;
  get [ACTOR_KEY]() {
    return (0, import_private_parts16.get)(this, ACTOR_KEY);
  }
  get [TRANSACTION_SESSION]() {
    return (0, import_private_parts16.get)(this, TRANSACTION_SESSION);
  }
  constructor(data, actor) {
    (0, import_private_parts16.set)(this, TRANSACTION_SESSION, data);
    (0, import_private_parts16.set)(this, ACTOR_KEY, actor);
  }
  /**
   * Retrieves Session data based from "name" key parameter.
   *
   * @param name Key of session data
   * @returns value of store session data. Or, undefined if not found
   */
  get(name) {
    const session = this[TRANSACTION_SESSION];
    return Object.prototype.hasOwnProperty.call(session, name) ? session[name] : void 0;
  }
  /**
   * Creates new transaction with overridden Session data
   *
   * @param overrides session data overrides
   * @returns Transaction
   */
  override(overrides) {
    const session = this[TRANSACTION_SESSION];
    const newData = Object.assign({}, session, overrides);
    return new _Transaction(newData, this[ACTOR_KEY]);
  }
  /**
   * Performs a Use-case and returns result of the Use-case handler.
   *
   * @param usecase The Use-case to perform allowed by Roles
   * @param params Use case handler parameters
   * @returns Result of perform Use-case
   */
  async perform(usecase, ...params) {
    const roles = usecase[ROLES_KEY];
    const actor = this[ACTOR_KEY];
    if (!isActorAllowToPerform(actor, roles)) {
      throw new Error(
        `${String(this[ACTOR_KEY])} is not allowed to perform "${String(usecase)}"`
      );
    }
    const handler = usecase[MOCK_HANDLER_KEY] || usecase[HANDLER_KEY];
    const transaction = new _Transaction(
      createSessionData(this[TRANSACTION_SESSION]),
      actor
    );
    const result = await handler(...params, transaction);
    emitSymbolEvent(
      usecase,
      "perform",
      result,
      usecase,
      actor
    );
    const goal = usecase[GOAL_KEY];
    emitSymbolEvent(goal, "achieved", goal, usecase, result);
    return result;
  }
};

// src/execution/functions/assume.function.ts
function assume(actor) {
  const transaction = new Transaction({}, actor);
  if (actor instanceof Actor) {
    emitSymbolEvent(actor, "assume", actor);
  }
  return transaction;
}

// src/event/functions/listen-symbol-event.function.ts
function listenSymbolEvent(symbol, type, listener) {
  symbol[EVENT_EMITTER_KEY].on(type, listener);
}

// src/event/functions/unlisten-symbol-event.function.ts
function unlistenSymbolEvent(symbol, type, listener) {
  symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}

// src/event/functions/clear-all-symbol-event-listeners.function.ts
function clearAllSymbolListeners() {
  let eventEmitter;
  SYMBOL_LOOKUP.forEach((symbol) => {
    eventEmitter = symbol[EVENT_EMITTER_KEY];
    eventEmitter.eventNames().forEach((key) => eventEmitter?.removeAllListeners(key));
  });
  eventEmitter = null;
}

// src/event/functions/clear-symbol-event-listeners.function.ts
function clearSymbolEventListeners(symbol, type) {
  symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}

// src/symbol/functions/clear-symbols.function.ts
function clearSymbols() {
  SYMBOL_LOOKUP.clear();
}

// src/usecase/functions/mock-usecase-handler.funtion.ts
function mockUsecaseHandler(usecase, handler) {
  usecase[MOCK_HANDLER_KEY] = handler;
  return usecase;
}

// src/usecase/functions/clear-mock-usecase-handler.function.ts
function clearMockeUsecaseHandler(usecase) {
  usecase[MOCK_HANDLER_KEY] = null;
  return usecase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Actor,
  Boundary,
  Goal,
  Role,
  Transaction,
  Usecase,
  assume,
  clearAllListeners,
  clearListeners,
  clearMockeUsecaseHandler,
  clearSymbols,
  defineScope,
  iAm,
  listen,
  mockUsecaseHandler,
  unlisten
});
//# sourceMappingURL=index.cjs.map
