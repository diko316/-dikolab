import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
export declare class IAmChain<ActorName extends string> {
    get [TITLE_KEY](): ActorName;
    constructor(actorName: ActorName);
    /**
     * Defines an Actor with the given Roles.
     *
     * @param roles Roles to attach
     * @returns Actor
     */
    as<RoleNames extends readonly string[]>(...roles: RoleNames): import("../..").Actor<ActorName, readonly [import("../..").Role<ActorName>, ...import("../../actor/types/utility.type").ResolveRoles<[...RoleNames]>]>;
}
