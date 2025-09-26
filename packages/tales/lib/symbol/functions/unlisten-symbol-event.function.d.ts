import { AnyEventMap } from '../../event/types/event-map.type';
import { AnyList, AnyType } from '../../utils/types/utility.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
/**
 * Removes event listener registered in the Target symbol
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 * @param listener The registered event listener callback function.
 */
export declare function unlistenSymbolEvent<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>, Params extends UsecaseSymbolEventMap<Source>[Type]>(symbol: Source, type: Type, listener: (...args: Params extends AnyList ? [...Params] : []) => AnyType): void;
