import type EventEmitter from 'events';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';
import { SYMBOL_LOOKUP } from '../../symbol/constants/symbol-lookup.constant';

/**
 * Clears all event listeners of all Symbols.
 * Target symbols. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 */
export function clearAllSymbolListeners(): void {
   let eventEmitter: EventEmitter | null;

   SYMBOL_LOOKUP.forEach((symbol) => {
      eventEmitter = symbol[EVENT_EMITTER_KEY];

      eventEmitter
         .eventNames()
         .forEach((key) => eventEmitter?.removeAllListeners(key));
   });

   eventEmitter = null;
}
