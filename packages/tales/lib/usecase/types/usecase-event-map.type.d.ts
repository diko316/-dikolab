import type { AnyActor } from '../../actor/types/utility.type';
import type { AnyType } from '../../utils/types/utility.type';
import type { AnyUsecase } from './utility.type';
export type UsecaseEventMap = {
    perform: [result: AnyType, usecase: AnyUsecase, actor: AnyActor];
};
