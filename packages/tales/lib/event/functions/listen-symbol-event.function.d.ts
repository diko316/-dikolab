import type { AnyEventMap } from '../types/event-map.type';
import type { AnyList, AnyType } from '../../utils/types/utility.type';
import type { UsecaseSymbolEventMap } from '../../symbol/types/usecase-symbol-event.type';
import type { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';
/**
 * Listens to Symbol events
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event type
 * @param listener the function callback to execute when event is dispatched.
 */
export declare function listenSymbolEvent<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>, Params extends UsecaseSymbolEventMap<Source>[Type]>(symbol: Source, type: Type, listener: (...args: Params extends AnyList ? [...Params] : []) => AnyType): void;
