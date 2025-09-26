import { beforeEach, describe, expect, it } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { defineActor } from './define-actor.function';
import { defineRole } from './define-role.function';

describe('defineActor()', () => {
   beforeEach(() => clearSymbols());

   it('should only define actor once', () => {
      defineActor('admin');

      expect(() => {
         return defineActor('admin');
      }).toThrowError();
   });

   it('should allow defining of multiple roles and reuse role if already defined', () => {
      defineRole('manager');

      defineActor('admin', 'manager', 'public-user');
      defineActor('secretary', 'manager');
   });
});
