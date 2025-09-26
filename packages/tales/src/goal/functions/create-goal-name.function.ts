import { AnyBoundary } from '../../boundary/types/utility.type';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';
import { GoalName } from '../types/goal-name.type';

export function createGoalName<
   Title extends string,
   Boundary extends AnyBoundary,
>(title: Title, boundary: Boundary) {
   const boundaryName = boundary[NAME_KEY];

   return `${boundaryName}-${title}` as GoalName<Title, Boundary>;
}
