import { get } from '@dikolab/private-parts';
import { AnyActor, ActorName } from '../types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';

export function getActorName<Actor extends AnyActor>(
   actor: Actor,
): ActorName<Actor> {
   return get(actor, NAME_KEY);
}
