import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant';
import type { AnyUsecase } from '../types/utility.type';

/**
 * Removes a mock handler from a use case,
 * restoring the original handler
 *
 * @param usecase The use case to restore
 * @returns The use case with original handler
 */
export function clearMockeUsecaseHandler<Usecase extends AnyUsecase>(
   usecase: Usecase,
): Usecase {
   usecase[MOCK_HANDLER_KEY] = null;
   return usecase;
}
