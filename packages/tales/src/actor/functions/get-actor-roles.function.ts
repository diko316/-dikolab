import { get } from '@dikolab/private-parts';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant';
import { ActorRoles, AnyActor } from '../types/utility.type';

export function getActorRoles<Actor extends AnyActor>(
   actor: Actor,
): ActorRoles<Actor> {
   return get(actor, ROLES_KEY);
}
