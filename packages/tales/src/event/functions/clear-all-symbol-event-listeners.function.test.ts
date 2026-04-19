import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { iAm } from '../../definition/functions/i-am.function';
import { listenSymbolEvent } from './listen-symbol-event.function';
import { clearAllSymbolListeners } from './clear-all-symbol-event-listeners.function';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';

describe('clearAllSymbolListeners()', () => {
   beforeEach(() => {
      clearSymbols();
   });

   it('should remove all listeners from all symbols', () => {
      const actorA = iAm('diko').as('admin');
      const actorB = iAm('cha').as('user');
      const listenerA = vi.fn();
      const listenerB = vi.fn();

      listenSymbolEvent(actorA, 'assume', listenerA);
      listenSymbolEvent(actorB, 'assume', listenerB);

      clearAllSymbolListeners();

      actorA[EVENT_EMITTER_KEY].emit('assume', actorA);
      actorB[EVENT_EMITTER_KEY].emit('assume', actorB);

      expect(listenerA).not.toHaveBeenCalled();
      expect(listenerB).not.toHaveBeenCalled();
   });
});
