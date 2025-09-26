import { beforeEach, describe, expect, it } from 'vitest';
import { defineUsecase } from './define-usecase.function';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { defineRole } from '../../actor/functions/define-role.function';
import { defineBoundary } from '../../boundary/functions/define-boundary.function';
import { Goal } from '../../goal/classes/goal.class';

describe('defineUsecase()', () => {
   beforeEach(() => {
      clearSymbols();
   });

   it('should be able to compose Usecase id like a User story.', () => {
      const boundary = defineBoundary('System', 'User');
      const goal = new Goal('User is created', boundary);
      const usecase = defineUsecase(
         'create User',
         [defineRole('admin'), defineRole('user')],
         goal,
         (name: string) => ({ name }),
      );
      expect(usecase[NAME_KEY]).toBe(
         'As Role<admin,user>, I can create User in System:User. So that, User is created',
      );
   });
});
