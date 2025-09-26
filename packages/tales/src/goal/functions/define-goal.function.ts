import { AnyBoundary } from '../../boundary/types/utility.type';
import { Goal } from '../classes/goal.class';

export function defineGoal<
   Title extends string,
   Boundary extends AnyBoundary,
>(title: Title, boundary: Boundary) {
   return new Goal(title, boundary);
}
