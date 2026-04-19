import type {
   AnyRole,
   StringifyRoles,
} from '../../actor/types/utility.type';
import type { BoundaryName } from '../../boundary/types/utility.type';
import type { GoalBoundary } from '../../goal/types/goal-boundary.type';
import type { GoalTitle } from '../../goal/types/goal-title.type';
import type { AnyGoal } from '../../goal/types/utility.type';

export type UsecaseActionTitle<
   Roles extends readonly AnyRole[],
   Action extends string,
> = `As Role<${StringifyRoles<Roles>}>, I can ${Action}`;

export type UsecaseTitleFrom<
   Title extends string,
   Roles extends readonly AnyRole[],
   Goal extends AnyGoal,
> = `${UsecaseActionTitle<Roles, Title>} in ${BoundaryName<GoalBoundary<Goal>>}. So that, ${GoalTitle<Goal>}`;
