import { get, set } from '@dikolab/private-parts';
import {
   ACTOR_KEY,
   GOAL_KEY,
   HANDLER_KEY,
   MOCK_HANDLER_KEY,
   ROLES_KEY,
   TRANSACTION_SESSION,
   TRANSACTION_SIGNATURE,
} from '../../utils/constants/symbol-keys.constant';
import { TransactionModel } from '../types/transaction-model.type';
import {
   PerformParameters,
   PerformAwaitedResult,
   PerformUsecase,
} from '../types/performer.type';

import { AnyActor } from '../../actor/types/utility.type';
import { isActorAllowToPerform } from '../functions/is-actor-allow-to-perform.function';
import { createSessionData } from '../functions/create-session-data.function';
import { AnyFunction } from '../../utils/types/utility.type';
import { emitSymbolEvent } from '../../symbol/functions/emit-symbol-event.function';
import { AnyUsecase } from '../types/utility.type';

export class Transaction<
   Data extends object,
   Actor extends AnyActor = AnyActor,
> implements TransactionModel<Data>
{
   readonly [TRANSACTION_SIGNATURE] = 1;

   get [ACTOR_KEY](): Actor {
      return get(this, ACTOR_KEY);
   }

   get [TRANSACTION_SESSION](): Readonly<Data> {
      return get(this, TRANSACTION_SESSION);
   }

   constructor(data: Data, actor: Actor) {
      set(this, TRANSACTION_SESSION, data);
      set(this, ACTOR_KEY, actor);
   }

   /**
    * Retrieves Session data based from "name" key parameter.
    *
    * @param name Key of session data
    * @returns value of store session data. Or, undefined if not found
    */
   get<Key extends keyof Data>(name: Key): Data[Key] | undefined {
      const session = this[TRANSACTION_SESSION];

      return Object.prototype.hasOwnProperty.call(session, name)
         ? session[name]
         : undefined;
   }

   /**
    * Creates new transaction with overridden Session data
    *
    * @param overrides session data overrides
    * @returns Transaction
    */
   override<Overrides extends object>(
      overrides: Overrides,
   ): Transaction<Data & Overrides> {
      const session = this[TRANSACTION_SESSION];

      const newData = Object.assign({}, session, overrides);

      return new Transaction(newData, this[ACTOR_KEY]);
   }

   /**
    * Performs a Use-case and returns result of the Use-case handler.
    *
    * @param usecase The Use-case to perform allowed by Roles
    * @param params Use case handler parameters
    * @returns Result of perform Use-case
    */
   async perform<Usecase extends PerformUsecase<Data>>(
      usecase: Usecase,
      ...params: PerformParameters<Usecase>
   ): Promise<PerformAwaitedResult<Usecase>> {
      const roles = usecase[ROLES_KEY];
      const actor = this[ACTOR_KEY];

      if (!isActorAllowToPerform(actor, roles)) {
         throw new Error(
            `${this[ACTOR_KEY]} is not allowed to perform "${usecase}"`,
         );
      }

      // if no mock handler, use the original handler
      const handler = (usecase[MOCK_HANDLER_KEY] ||
         usecase[HANDLER_KEY]) as AnyFunction;

      const transaction = new Transaction(
         createSessionData(this[TRANSACTION_SESSION]),
         actor,
      );

      const result = await handler(...params, transaction);

      emitSymbolEvent(
         usecase as AnyUsecase,
         'perform',
         result,
         usecase,
         actor,
      );

      const goal = usecase[GOAL_KEY];

      emitSymbolEvent(goal, 'achieved', goal, usecase, result);

      return result;
   }
}
