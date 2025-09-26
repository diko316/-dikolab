import { get, set } from '@dikolab/private-parts';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { defineActor } from '../../actor/functions/define-actor.function';

export class IAmChain<ActorName extends string> {
   get [TITLE_KEY](): ActorName {
      return get(this, TITLE_KEY);
   }

   constructor(actorName: ActorName) {
      set(this, TITLE_KEY, actorName);
   }

   as<RoleNames extends readonly string[]>(...roles: RoleNames) {
      return defineActor(this[TITLE_KEY], ...roles);
   }
}
