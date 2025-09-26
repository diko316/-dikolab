import { BOUNDARY_KEY, ROLE_NAMES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { ActionTitleDefined } from '../types/action-title-defined.interface';
import { RoleNamesDefined } from '../types/role-names-defined.interface';
import { SoThatGoal } from '../types/so-that-goal.interface';
import { AnyGoal, AnyGoalBoundTo } from '../../goal/types/utility.type';
import { AsICanSoThatChain } from './as-i-can-so-that-chain.class';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';
export declare class AsICanChain<Boundary extends AnyBoundary, RoleNames extends readonly string[], ActionTitle extends string> implements BoundaryDefined<Boundary>, RoleNamesDefined<RoleNames>, ActionTitleDefined<ActionTitle>, SoThatGoal<Boundary> {
    get [BOUNDARY_KEY](): Boundary;
    get [ROLE_NAMES_KEY](): RoleNames;
    get [TITLE_KEY](): ActionTitle;
    constructor(boundary: Boundary, roleNames: RoleNames, title: ActionTitle);
    soThat<Goal extends AnyGoalBoundTo<Boundary>>(goal: AnyGoal): AsICanSoThatChain<Boundary, RoleNames, ActionTitle, Goal>;
}
