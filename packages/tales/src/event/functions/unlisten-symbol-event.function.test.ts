import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { iAm } from '../../definition/functions/i-am.function';
import { listenSymbolEvent } from './listen-symbol-event.function';
import { unlistenSymbolEvent } from './unlisten-symbol-event.function';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';

describe('unlistenSymbolEvent()', () => {
   beforeEach(() => {
      clearSymbols();
   });

   it('should remove a registered event listener', () => {
      const actor = iAm('diko').as('admin');
      const listener = vi.fn();

      listenSymbolEvent(actor, 'assume', listener);
      unlistenSymbolEvent(actor, 'assume', listener);

      actor[EVENT_EMITTER_KEY].emit('assume', actor);

      expect(listener).not.toHaveBeenCalled();
   });
});
