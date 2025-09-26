import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import { AnyEventMap } from '../../event/types/event-map.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';

/**
 * Removes all event listeners of the Target symbol registered for event type.
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 */
export function clearSymbolEventListeners<
   Source extends UsecaseSymbolModel<string, string, AnyEventMap>,
   Type extends keyof UsecaseSymbolEventMap<Source>,
>(symbol: Source, type: Type): void {
   symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}
