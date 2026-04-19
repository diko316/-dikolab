import type { UsecaseHandler } from '../types/usecase-handler.type';
import type { AnyUsecase } from '../types/utility.type';
/**
 * Replaces a use case's handler with a mock
 * for testing purposes
 *
 * @param usecase The use case to mock
 * @param handler The mock handler function
 * @returns The use case with mocked handler
 */
export declare function mockUsecaseHandler<Usecase extends AnyUsecase>(usecase: Usecase, handler: UsecaseHandler<Usecase>): Usecase;
