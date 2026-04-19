import type { UsecaseHandler } from '../types/usecase-handler.type';
import type { AnyUsecase } from '../types/utility.type';
export declare function mockUsecaseHandler<Usecase extends AnyUsecase>(usecase: Usecase, handler: UsecaseHandler<Usecase>): Usecase;
