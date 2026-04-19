import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant';
import type { AnyUsecase } from '../types/utility.type';

export function clearMockeUsecaseHandler<Usecase extends AnyUsecase>(
   usecase: Usecase,
): Usecase {
   usecase[MOCK_HANDLER_KEY] = null;
   return usecase;
}
