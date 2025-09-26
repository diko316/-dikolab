import { AnyActor, AnyRole } from '../../actor/types/utility.type';
export declare function isActorAllowToPerform<Actor extends AnyActor, Roles extends readonly AnyRole[]>(actor: Actor, roles: Roles): boolean;
