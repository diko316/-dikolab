import type { AnyActor } from '../../actor/types/utility.type';
import type { AnyType } from '../../utils/types/utility.type';
import type { AnyUsecase } from './utility.type';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UsecaseEventMap = {
   perform: [result: AnyType, usecase: AnyUsecase, actor: AnyActor];
};
