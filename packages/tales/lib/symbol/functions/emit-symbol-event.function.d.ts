import { AnyEventMap } from '../../event/types/event-map.type';
import { AnyList } from '../../utils/types/utility.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
/**
 * Disptaches Target Symbol event.
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event type
 * @param args Parameters of the dispatched event.
 */
export declare function emitSymbolEvent<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>, Params extends UsecaseSymbolEventMap<Source>[Type]>(symbol: Source, type: Type, ...args: Params extends AnyList ? [...Params] : []): void;
