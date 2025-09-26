import { AnyBoundary } from '../../boundary/types/utility.type';
import { BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant';

export interface BoundaryDefined<Boundary extends AnyBoundary> {
   readonly [BOUNDARY_KEY]: Boundary;
}
