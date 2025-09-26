import { get } from '@dikolab/private-parts';
import { AnyBoundary, BoundaryName } from '../types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';

export function getBoundaryName<Boundary extends AnyBoundary>(
   boundary: Boundary,
): BoundaryName<Boundary> {
   return get(boundary, NAME_KEY);
}
