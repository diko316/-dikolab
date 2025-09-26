import { BOUNDARY_KEY, GOAL_KEY, ROLE_NAMES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { ActionTitleDefined } from '../types/action-title-defined.interface';
import { RoleNamesDefined } from '../types/role-names-defined.interface';
import { Usecase } from '../../usecase/classes/usecase.class';
import { AnyGoal } from '../../goal/types/utility.type';
import { GoalDefined } from '../types/goal-defined.interface';
import { ResolveRoles } from '../../actor/types/utility.type';
import { AnyFunction } from '../../utils/types/utility.type';
import { ImplementedAs } from '../types/implemented-as.interface';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';
export declare class AsICanSoThatChain<Boundary extends AnyBoundary, RoleNames extends readonly string[], ActionTitle extends string, Goal extends AnyGoal> implements BoundaryDefined<Boundary>, RoleNamesDefined<RoleNames>, ActionTitleDefined<ActionTitle>, GoalDefined<Goal>, ImplementedAs<RoleNames, ActionTitle, Goal> {
    get [BOUNDARY_KEY](): Boundary;
    get [ROLE_NAMES_KEY](): RoleNames;
    get [TITLE_KEY](): ActionTitle;
    get [GOAL_KEY](): Goal;
    constructor(boundary: Boundary, roleNames: RoleNames, title: ActionTitle, goal: Goal);
    implementedAs<Handler extends AnyFunction>(handler: Handler): Usecase<ActionTitle, ResolveRoles<RoleNames>, Handler, Goal>;
}
