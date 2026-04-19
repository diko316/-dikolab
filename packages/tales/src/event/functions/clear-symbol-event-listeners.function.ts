import { EVENT_EMITTER_KEY } from '../constants/event-keys';
import type { AnyEventMap } from '../types/event-map.type';
import type { UsecaseSymbolEventMap } from '../../symbol/types/usecase-symbol-event.type';
import type { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';

/**
 * Removes all event listeners of the Target symbol registered for event type.
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 */
export function clearSymbolEventListeners<
   Source extends UsecaseSymbolModel<string, string, AnyEventMap>,
>(symbol: Source, type: keyof UsecaseSymbolEventMap<Source>): void {
   symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}
