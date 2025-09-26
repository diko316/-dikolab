import { ActionTitleDefined } from './action-title-defined.interface';
export interface ICanActionTitle {
    /**
     * Defines an Action description for the Use-case
     *
     * @param actionTitle title of the action
     * @returns chainable definition of action
     */
    iCan<ActionTitle extends string>(actionTitle: ActionTitle): ActionTitleDefined<ActionTitle>;
}
