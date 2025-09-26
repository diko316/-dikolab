import { IntersectTuple } from '../../utils/types/utility.type';
import { AnyRole } from '../types/utility.type';
export declare function intersectRoles<Pool extends readonly AnyRole[], Target extends readonly AnyRole[]>(pool: Pool, target: Target): [...IntersectTuple<Pool, Target>];
