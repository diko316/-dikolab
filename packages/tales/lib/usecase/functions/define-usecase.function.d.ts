import type { AnyRole } from '../../actor/types/utility.type';
import type { AnyGoal } from '../../goal/types/utility.type';
import type { AnyFunction } from '../../utils/types/utility.type';
import { Usecase } from '../classes/usecase.class';
export declare function defineUsecase<Title extends string, Roles extends readonly AnyRole[], Handler extends AnyFunction, Goal extends AnyGoal>(title: Title, roles: Roles, goal: Goal, handler: Handler): Usecase<Title, Roles, Handler, Goal>;
