import { BoundaryModel } from './boundary-model.interface';

export type AnyBoundary = BoundaryModel<string, string>;

export type BoundaryName<Boundary extends AnyBoundary> =
   Boundary extends BoundaryModel<infer Type, infer Title>
      ? `${Type}:${Title}`
      : 'Boundary:Uknown';

export type BoundaryType<Boundary extends AnyBoundary> =
   Boundary extends BoundaryModel<infer Type, string>
      ? Type
      : 'Boundary:Uknown Type';

export type BoundaryTitle<Boundary extends AnyBoundary> =
   Boundary extends BoundaryModel<string, infer Title>
      ? Title
      : 'Boundary:Unknown Title';
