import {
  emitSymbolEvent
} from "./chunk-G5NCA5HY.mjs";
import {
  isActorAllowToPerform
} from "./chunk-3C2G3J5C.mjs";
import {
  createSessionData
} from "./chunk-WJ7ZSJ3X.mjs";
import {
  ACTOR_KEY,
  GOAL_KEY,
  HANDLER_KEY,
  MOCK_HANDLER_KEY,
  ROLES_KEY,
  TRANSACTION_SESSION,
  TRANSACTION_SIGNATURE
} from "./chunk-U743HXLL.mjs";

// src/usecase/classes/transaction.class.ts
import { get, set } from "@dikolab/private-parts";
var Transaction = class _Transaction {
  [TRANSACTION_SIGNATURE] = 1;
  get [ACTOR_KEY]() {
    return get(this, ACTOR_KEY);
  }
  get [TRANSACTION_SESSION]() {
    return get(this, TRANSACTION_SESSION);
  }
  constructor(data, actor) {
    set(this, TRANSACTION_SESSION, data);
    set(this, ACTOR_KEY, actor);
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

export {
  Transaction
};
//# sourceMappingURL=chunk-U34HEQOR.mjs.map
