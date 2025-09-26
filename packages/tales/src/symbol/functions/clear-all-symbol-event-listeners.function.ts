import EventEmitter from 'events';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant';

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
