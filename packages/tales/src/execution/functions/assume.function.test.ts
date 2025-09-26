import { beforeEach, describe, expect, it } from 'vitest';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { defineScope } from '../../definition/functions/define-scope.function';
import { assume } from './assume.function';
import { iAm } from '../../definition/functions/i-am.function';

describe('assume()', () => {
   beforeEach(() => clearSymbols());

   it('should assume actor and perform use-case', async () => {
      const UserEntity = defineScope('Entity:User');

      const UserIsCreated = UserEntity.defineGoal('User is Created');
      const CreateUserUsecase = UserEntity.as(
         'administrator',
         'manager',
      )
         .iCan('Create User')
         .soThat(UserIsCreated)
         .implementedAs((name: string) => {
            if (name === 'diko') {
               return {
                  type: 'user',
                  name,
               };
            }

            throw new Error('name is not diko');
         });

      const Admin = iAm('diko').as('manager', 'administrator');

      await expect(
         assume(Admin).perform(CreateUserUsecase, 'diko'),
      ).resolves.toEqual({
         type: 'user',
         name: 'diko',
      });

      await expect(
         assume(Admin).perform(CreateUserUsecase, 'cha'),
      ).rejects.toThrow();
   });
});
