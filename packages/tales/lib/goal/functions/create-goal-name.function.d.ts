import { AnyBoundary } from '../../boundary/types/utility.type';
import { GoalName } from '../types/goal-name.type';
export declare function createGoalName<Title extends string, Boundary extends AnyBoundary>(title: Title, boundary: Boundary): GoalName<Title, Boundary>;
