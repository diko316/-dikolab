import { Usecase } from '../../usecase/classes/usecase.class';
import { AnyFunction } from '../../utils/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { ResolveRoles } from '../../actor/types/utility.type';
export interface ImplementedAs<RoleNames extends readonly [...string[]], ActionTitle extends string, Goal extends AnyGoal> {
    /**
     * Defines an Action description and Action handler for the Use-case
     *
     * @param actionTitle title of the action
     * @param handler callback function for the action
     * @returns chainable definition of action
     */
    implementedAs<Handler extends AnyFunction>(handler: Handler): Usecase<ActionTitle, ResolveRoles<RoleNames>, Handler, Goal>;
}
