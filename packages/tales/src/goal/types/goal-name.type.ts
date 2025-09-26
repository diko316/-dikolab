import {
   AnyBoundary,
   BoundaryName,
} from '../../boundary/types/utility.type';

export type GoalName<
   Title extends string,
   Boundary extends AnyBoundary,
> = `${BoundaryName<Boundary>}-${Title}`;
