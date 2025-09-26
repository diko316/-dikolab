import { BOUNDARY_KEY, ROLE_NAMES_KEY } from '../../utils/constants/symbol-keys.constant';
import { RoleNamesDefined } from '../types/role-names-defined.interface';
import { ICanActionTitle } from '../types/i-can-action-title.interface';
import { AsICanChain } from './as-i-can-chain.class';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';
export declare class AsChain<Boundary extends AnyBoundary, RoleNames extends readonly [...string[]]> implements BoundaryDefined<Boundary>, RoleNamesDefined<RoleNames>, ICanActionTitle {
    get [BOUNDARY_KEY](): Boundary;
    get [ROLE_NAMES_KEY](): RoleNames;
    constructor(boundary: Boundary, roleNames: RoleNames);
    /**
     * Declares text title of the Use-case.
     *
     * @param title Text title of the Use-case
     * @returns declaration chain
     */
    iCan<ActionTitle extends string>(title: ActionTitle): AsICanChain<Boundary, RoleNames, ActionTitle>;
}
