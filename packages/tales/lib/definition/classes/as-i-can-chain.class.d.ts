import { BOUNDARY_KEY, ROLE_NAMES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import type { ActionTitleDefined } from '../types/action-title-defined.interface';
import type { RoleNamesDefined } from '../types/role-names-defined.interface';
import type { SoThatGoal } from '../types/so-that-goal.interface';
import type { AnyGoal, AnyGoalBoundTo } from '../../goal/types/utility.type';
import { AsICanSoThatChain } from './as-i-can-so-that-chain.class';
import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { BoundaryDefined } from '../types/boundary-defined.interface';
export declare class AsICanChain<Boundary extends AnyBoundary, RoleNames extends readonly string[], ActionTitle extends string> implements BoundaryDefined<Boundary>, RoleNamesDefined<RoleNames>, ActionTitleDefined<ActionTitle>, SoThatGoal<Boundary> {
    get [BOUNDARY_KEY](): Boundary;
    get [ROLE_NAMES_KEY](): RoleNames;
    get [TITLE_KEY](): ActionTitle;
    constructor(boundary: Boundary, roleNames: RoleNames, title: ActionTitle);
    /**
     * Assigns Goal of the Use-case
     *
     * @param goal The goal of the Use-case.
     * @returns declaration chain
     */
    soThat<Goal extends AnyGoalBoundTo<Boundary>>(goal: AnyGoal): AsICanSoThatChain<Boundary, RoleNames, ActionTitle, Goal>;
}
