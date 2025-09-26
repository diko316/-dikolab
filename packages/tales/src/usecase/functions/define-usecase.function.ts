import { AnyRole } from '../../actor/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { AnyFunction } from '../../utils/types/utility.type';
import { Usecase } from '../classes/usecase.class';

export function defineUsecase<
   Title extends string,
   Roles extends readonly AnyRole[],
   Handler extends AnyFunction,
   Goal extends AnyGoal,
>(title: Title, roles: Roles, goal: Goal, handler: Handler) {
   return new Usecase(title, roles, goal, handler);
}
