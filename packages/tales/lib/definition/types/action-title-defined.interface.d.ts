import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
export interface ActionTitleDefined<ActionTitle extends string> {
    readonly [TITLE_KEY]: ActionTitle;
}
