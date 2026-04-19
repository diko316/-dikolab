import { get } from '@dikolab/private-parts';
import type { AnyBoundary, BoundaryName } from '../types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';

export function getBoundaryName<Boundary extends AnyBoundary>(
   boundary: Boundary,
): BoundaryName<Boundary> {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return get(boundary, NAME_KEY);
}
