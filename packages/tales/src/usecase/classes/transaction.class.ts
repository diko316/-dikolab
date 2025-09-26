import { get, set } from '@dikolab/private-parts';
import {
   ACTOR_KEY,
   HANDLER_KEY,
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

   get<Key extends keyof Data>(name: Key): Data[Key] | undefined {
      const session = this[TRANSACTION_SESSION];

      return Object.prototype.hasOwnProperty.call(session, name)
         ? session[name]
         : undefined;
   }

   override<Overrides extends object>(
      overrides: Overrides,
   ): Transaction<Data & Overrides> {
      const session = this[TRANSACTION_SESSION];

      const newData = Object.assign({}, session, overrides);

      return new Transaction(newData, this[ACTOR_KEY]);
   }

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

      const handler = usecase[HANDLER_KEY] as AnyFunction;

      const transaction = new Transaction(
         createSessionData(this[TRANSACTION_SESSION]),
         actor,
      );

      const result = await handler(...params, transaction);

      return result;
   }
}
