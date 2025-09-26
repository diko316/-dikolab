import { clearSymbols } from './symbol/functions/clear-symbols.function';
import { iAm } from './definition/functions/i-am.function';
import { defineScope } from './definition/functions/define-scope.function';
import { assume } from './execution/functions/assume.function';

import { listenSymbolEvent as listen } from './symbol/functions/listen-symbol-event.function';
import { unlistenSymbolEvent as unlisten } from './symbol/functions/unlisten-symbol-event.function';
import { clearAllSymbolListeners as clearAllListeners } from './symbol/functions/clear-all-symbol-event-listeners.function';
import { clearSymbolEventListeners as clearListeners } from './symbol/functions/clear-symbol-event-listeners.function';

export {
   // Definitions
   iAm,
   defineScope,

   // Execution
   assume,

   // Event Listeners
   listen,
   unlisten,
   clearListeners,
   clearAllListeners,

   // utility
   clearSymbols,
};
