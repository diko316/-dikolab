import { AnyBoundary, BoundaryName } from '../types/utility.type';
export declare function getBoundaryName<Boundary extends AnyBoundary>(boundary: Boundary): BoundaryName<Boundary>;
