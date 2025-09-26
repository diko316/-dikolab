import { get, set } from '@dikolab/private-parts';
import {
   BOUNDARY_KEY,
   ROLE_NAMES_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { RoleNamesDefined } from '../types/role-names-defined.interface';
import { ICanActionTitle } from '../types/i-can-action-title.interface';
import { AsICanChain } from './as-i-can-chain.class';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';

export class AsChain<
      Boundary extends AnyBoundary,
      RoleNames extends readonly [...string[]],
   >
   implements
      BoundaryDefined<Boundary>,
      RoleNamesDefined<RoleNames>,
      ICanActionTitle
{
   get [BOUNDARY_KEY](): Boundary {
      return get(this, BOUNDARY_KEY);
   }

   get [ROLE_NAMES_KEY](): RoleNames {
      return get(this, ROLE_NAMES_KEY);
   }

   constructor(boundary: Boundary, roleNames: RoleNames) {
      set(this, BOUNDARY_KEY, boundary);
      set(this, ROLE_NAMES_KEY, roleNames);
   }

   /**
    * Declares text title of the Use-case.
    *
    * @param title Text title of the Use-case
    * @returns declaration chain
    */
   iCan<ActionTitle extends string>(
      title: ActionTitle,
   ): AsICanChain<Boundary, RoleNames, ActionTitle> {
      return new AsICanChain(
         this[BOUNDARY_KEY],
         this[ROLE_NAMES_KEY],
         title,
      );
   }
}
