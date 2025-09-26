import { get } from '@dikolab/private-parts';
import { AnyBoundary, BoundaryType } from '../types/utility.type';
import { TYPE_KEY } from '../../utils/constants/symbol-keys.constant';

export function getBoundaryType<Boundary extends AnyBoundary>(
   boundary: Boundary,
): BoundaryType<Boundary> {
   return get(boundary, TYPE_KEY);
}
