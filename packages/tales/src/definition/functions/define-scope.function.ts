import { createBoundaryNameDetails } from '../../boundary/functions/create-boundary-name-details.function';
import { defineBoundary } from '../../boundary/functions/define-boundary.function';
import { Scope } from '../classes/scope.class';

export function defineScope<Type extends string, Title extends string>(
   name: `${Type}:${Title}`,
) {
   const [type, title] = createBoundaryNameDetails(name);

   const boundary = defineBoundary(type, title);

   return new Scope(boundary);
}
