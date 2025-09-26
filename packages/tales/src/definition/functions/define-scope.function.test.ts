import { beforeEach, describe, expect, it } from 'vitest';
import { defineScope } from './define-scope.function';
import { Goal } from '../../goal/classes/goal.class';
import { Scope } from '../classes/scope.class';
import { Boundary } from '../../boundary/classes/boundary.class';
import { AsChain } from '../classes/as-chain.class';
import { clearSymbols } from '../../symbol/functions/clear-symbols.function';
import { Usecase } from '../../usecase/classes/usecase.class';
import { Transaction } from '../../usecase/classes/transaction.class';

describe('defineScope()', () => {
   let UserEntity: Scope<Boundary<'Domain', 'User'>>;

   beforeEach(() => {
      clearSymbols();

      UserEntity = defineScope('Domain:User');
   });

   it('should define scope and goals', () => {
      const UserIsCreatedGoal =
         UserEntity.defineGoal('User is Created.');

      expect(UserIsCreatedGoal).toBeInstanceOf(Goal);
   });

   it('should be able to chain AsChain instance', () => {
      const result = UserEntity.as('admin', 'user');

      expect(result).toBeInstanceOf(AsChain);
   });

   it('should be able to create usecase after ending the statement', () => {
      const UserIsCreated = UserEntity.defineGoal('User is created');
      const result = UserEntity.as('admin', 'user')
         .iCan('create User')
         .soThat(UserIsCreated)
         .implementedAs((name: string) => ({
            name,
         }));

      expect(result).toBeInstanceOf(Usecase);
   });

   it('should be able to accept "string" boundary', () => {
      const UserIsCreated = UserEntity.defineGoal('User is created.');
      const UserIsVerified = UserEntity.defineGoal('User is verified.');

      const first = UserEntity.as('admin')
         .iCan('verify User')
         .soThat(UserIsVerified)
         .implementedAs(
            (
               username: string,
               transaction: Transaction<{ protocol: string }>,
            ) => {
               return {
                  username,
                  verifyProtocol: transaction.get('protocol'),
               };
            },
         );
      const result = UserEntity.as('admin', 'user')
         .iCan('create User')
         .soThat(UserIsCreated)
         .implementedAs(
            async (
               name: string,
               transaction: Transaction<{ protocol: string }>,
            ) => {
               const result = await transaction.perform(
                  first,
                  `user ${name}`,
               );

               return {
                  requestProtocol: transaction.get('protocol'),
                  name,
                  username: result.username,
               };
            },
         );

      expect(result).toBeInstanceOf(Usecase);
   });
});
