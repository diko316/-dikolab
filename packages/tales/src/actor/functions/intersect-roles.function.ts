import { IntersectTuple } from '../../utils/types/utility.type';
import { AnyRole } from '../types/utility.type';

export function intersectRoles<
   Pool extends readonly AnyRole[],
   Target extends readonly AnyRole[],
>(pool: Pool, target: Target) {
   const set = new WeakSet<AnyRole>(pool);
   return target.filter((role) => set.has(role)) as [
      ...IntersectTuple<Pool, Target>,
   ];
}
