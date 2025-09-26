import { AnyRole } from '../../actor/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { UsecaseTitleFrom } from '../types/usecase-title-from.type';
export declare function createUsecaseTitle<Title extends string, Roles extends readonly AnyRole[], Goal extends AnyGoal>(title: Title, goal: Goal, ...roles: Roles): UsecaseTitleFrom<Title, Roles, Goal>;
