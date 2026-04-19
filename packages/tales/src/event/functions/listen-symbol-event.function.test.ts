import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { iAm } from '../../definition/functions/i-am.function';
import { listenSymbolEvent } from './listen-symbol-event.function';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';

describe('listenSymbolEvent()', () => {
   beforeEach(() => {
      clearSymbols();
   });

   it('should register an event listener on a symbol', () => {
      const actor = iAm('diko').as('admin');
      const listener = vi.fn();

      listenSymbolEvent(actor, 'assume', listener);

      actor[EVENT_EMITTER_KEY].emit('assume', actor);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener).toHaveBeenCalledWith(actor);
   });
});
