import { RoutePath } from './route-path.type';

export interface RouteStateMachineState {
   id: symbol;
   literalMatch: Map<string, symbol>;
   variableMatch: Set<symbol>;
   matchedRoute: RoutePath | null;
}
