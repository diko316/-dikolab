import { Boundary } from '../classes/boundary.class';

export function defineBoundary<
   Type extends string,
   Title extends string,
>(type: Type, title: Title): Boundary<Type, Title> {
   return new Boundary(type, title);
}
