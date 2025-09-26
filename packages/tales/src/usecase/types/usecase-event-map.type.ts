import { AnyActor } from '../../actor/types/utility.type';
import { AnyType } from '../../utils/types/utility.type';
import { AnyUsecase } from './utility.type';

export type UsecaseEventMap = {
   perform: [result: AnyType, usecase: AnyUsecase, actor: AnyActor];
};
