import { UsecaseHandler } from '../types/usecase-handler.type';
import { AnyUsecase } from '../types/utility.type';
export declare function mockUsecaseHandler<Usecase extends AnyUsecase>(usecase: Usecase, handler: UsecaseHandler<Usecase>): Usecase;
