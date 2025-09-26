import { get } from '@dikolab/private-parts';
import { AnyBoundary, BoundaryTitle } from '../types/utility.type';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';

export function getBoundaryTitle<Boundary extends AnyBoundary>(
   boundary: Boundary,
): BoundaryTitle<Boundary> {
   return get(boundary, TITLE_KEY);
}
