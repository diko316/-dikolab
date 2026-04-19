import { EVENT_EMITTER_KEY } from '../constants/event-keys';
import type { AnyEventMap } from '../types/event-map.type';
import type { AnyList, AnyType } from '../../utils/types/utility.type';
import type { UsecaseSymbolEventMap } from '../../symbol/types/usecase-symbol-event.type';
import type { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';

/**
 * Removes event listener registered in the Target symbol
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 * @param listener The registered event listener callback function.
 */
export function unlistenSymbolEvent<
   Source extends UsecaseSymbolModel<string, string, AnyEventMap>,
   Type extends keyof UsecaseSymbolEventMap<Source>,
   Params extends UsecaseSymbolEventMap<Source>[Type],
>(
   symbol: Source,
   type: Type,
   listener: (
      ...args: Params extends AnyList ? [...Params] : []
   ) => AnyType,
): void {
   symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}
