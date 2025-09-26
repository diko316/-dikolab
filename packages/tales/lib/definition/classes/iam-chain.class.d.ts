import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
export declare class IAmChain<ActorName extends string> {
    get [TITLE_KEY](): ActorName;
    constructor(actorName: ActorName);
    as<RoleNames extends readonly string[]>(...roles: RoleNames): import("../../actor/classes/actor.class").Actor<ActorName, readonly [import("../../actor/classes/role.class").Role<ActorName>, ...import("../../actor/types/utility.type").ResolveRoles<[...RoleNames]>]>;
}
