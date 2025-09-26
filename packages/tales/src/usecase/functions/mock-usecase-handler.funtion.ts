import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant';
import { UsecaseHandler } from '../types/usecase-handler.type';
import { AnyUsecase } from '../types/utility.type';

export function mockUsecaseHandler<Usecase extends AnyUsecase>(
   usecase: Usecase,
   handler: UsecaseHandler<Usecase>,
): Usecase {
   usecase[MOCK_HANDLER_KEY] = handler;
   return usecase;
}
