import { buildRoute } from '../functions/build-route.function';
import { itemizePath } from '../functions/itemize-path.function';
import { RoutePath } from '../types/route-path.type';
import { RouteItemType } from '../types/route-item-type.enum';
import { RouteStateMachineState } from '../types/route-state-machine-state.type';
import { RouteItemizedPath } from '../types/route-itemized-path.type';
import { RouteMatch } from '../types/route-match.type';

type StateMap = Map<symbol, RouteStateMachineState>;

const STATE_LIST_STORE = new WeakMap<RouteMatcher, StateMap>();
const START_STATE_STORE = new WeakMap<RouteMatcher, RouteStateMachineState>();

export class RouteMatcher {
   protected get states(): StateMap {
      return STATE_LIST_STORE.get(this);
   }

   protected get startState(): RouteStateMachineState {
      return START_STATE_STORE.get(this);
   }

   constructor() {
      STATE_LIST_STORE.set(this, new Map());
      START_STATE_STORE.set(this, this.createState());
   }

   private createState(): RouteStateMachineState {
      const id = Symbol('state');
      const state: RouteStateMachineState = {
         id,
         literalMatch: new Map(),
         variableMatch: new Set(),
         matchedRoute: null,
      };

      this.states.set(id, state);

      return state;
   }

   private getState(id: symbol): RouteStateMachineState {
      return this.states.has(id) ? this.states.get(id) : null;
   }

   private createLiteralTransition(
      state: RouteStateMachineState,
      input: string,
   ): RouteStateMachineState {
      const matcher = state.literalMatch;

      if (matcher.has(input)) {
         return this.getState(matcher.get(input));
      }

      // create new state
      const target = this.createState();

      matcher.set(input, target.id);

      return target;
   }

   private createVariableTransition(
      state: RouteStateMachineState,
   ): RouteStateMachineState {
      const target = this.createState();

      state.variableMatch.add(target.id);

      return target;
   }

   private createEndState(
      state: RouteStateMachineState,
      route: RoutePath,
   ): symbol {
      if (state.matchedRoute) {
         throw new Error(`Route ${route.path} already exists.`);
      }

      state.matchedRoute = route;

      return state.id;
   }

   protected findMatch(parts: Array<string>): RoutePath | null {
      let states = [this.startState];

      for (let c = 0, length = parts.length; length--; ) {
         const input = parts[c++];
         const targetStates: Array<RouteStateMachineState> = [];

         // transition states!
         states.forEach(state => {
            const literalMatcher = state.literalMatch;
            // literal match
            if (literalMatcher.has(input)) {
               targetStates.push(this.getState(literalMatcher.get(input)));
            }

            // push all variables
            state.variableMatch.forEach(id =>
               targetStates.push(this.getState(id)),
            );
         });

         // no state found
         if (!targetStates.length) {
            break;
         }

         states = targetStates;
      }

      // return route with highest weight
      const selectedState = states.reduce((currentState, state) => {
         const found = state.matchedRoute;

         if (!found) {
            return currentState;
         }

         const currentWeight = currentState?.matchedRoute?.weight || 0;
         const foundWeight = found.weight || 0;

         return foundWeight > currentWeight ? state : currentState;
      }, null);

      return selectedState?.matchedRoute || null;
   }

   protected buildParameters(
      route: RoutePath,
      input: RouteItemizedPath,
   ): RouteMatch {
      const pathParts = input.items;

      const parameters = route.items.reduce(
         (all, { name, type }, index) => {
            if (type !== RouteItemType.VARIABLE) {
               return all;
            }

            // push
            all[name] = pathParts[index];

            return all;
         },
         {} as RouteMatch['parameters'],
      );

      return {
         ...route,
         parameters,
      };
   }

   add(path: string): this {
      const route = buildRoute(path);
      const lastIndex = route.items.length;

      let state = this.startState;

      // insert method as first item to match before path
      const methodItem = {
         type: RouteItemType.LITERAL,
         name: route.method,
      };

      [methodItem, ...route.items].forEach(({ type, name }, index) => {
         switch (type) {
            case RouteItemType.VARIABLE:
               state = this.createVariableTransition(state);
               break;

            case RouteItemType.LITERAL:
            default:
               state = this.createLiteralTransition(state, name);
         }

         // create reducer
         if (index === lastIndex) {
            this.createEndState(state, route);
         }
      });

      return this;
   }

   match(path: string): RouteMatch | null {
      const pathInput = itemizePath(path);

      const route = this.findMatch([pathInput.method, ...pathInput.items]);

      if (!route) {
         return null;
      }

      return this.buildParameters(route, pathInput);
   }
}
