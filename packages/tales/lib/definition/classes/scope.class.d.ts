import { AnyBoundary } from '../../boundary/types/utility.type';
import { BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant';
import { Goal } from '../../goal/classes/goal.class';
import { AnyRole, ResolveRoleNames } from '../../actor/types/utility.type';
import { AsChain } from './as-chain.class';
export declare class Scope<Boundary extends AnyBoundary> {
    get [BOUNDARY_KEY](): Boundary;
    constructor(boundary: Boundary);
    defineGoal<Title extends string>(title: Title): Goal<Title, Boundary>;
    /**
     * Creates definition of Roles that can execute the Use-case
     *
     * @param roles Role names or Roles included in the context
     * @returns definition chain object
     */
    as<Targets extends readonly (string | AnyRole)[]>(...roles: Targets): AsChain<Boundary, ResolveRoleNames<Targets>>;
}
