import { beforeEach, describe, expect, it } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { iAm } from './i-am.function';
import { Actor } from '../../actor/classes/actor.class';

describe('iAm()', () => {
   beforeEach(() => clearSymbols());

   it('should create actor by supplying actor name and role names', () => {
      const actor = iAm('admin').as('administrator', 'manager');

      expect(actor).toBeInstanceOf(Actor);
   });
});
