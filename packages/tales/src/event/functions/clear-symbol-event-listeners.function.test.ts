import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { iAm } from '../../definition/functions/i-am.function';
import { listenSymbolEvent } from './listen-symbol-event.function';
import { clearSymbolEventListeners } from './clear-symbol-event-listeners.function';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';

describe('clearSymbolEventListeners()', () => {
   beforeEach(() => {
      clearSymbols();
   });

   it('should remove all listeners for a specific event type', () => {
      const actor = iAm('diko').as('admin');
      const listenerA = vi.fn();
      const listenerB = vi.fn();

      listenSymbolEvent(actor, 'assume', listenerA);
      listenSymbolEvent(actor, 'assume', listenerB);

      clearSymbolEventListeners(actor, 'assume');

      actor[EVENT_EMITTER_KEY].emit('assume', actor);

      expect(listenerA).not.toHaveBeenCalled();
      expect(listenerB).not.toHaveBeenCalled();
   });
});
