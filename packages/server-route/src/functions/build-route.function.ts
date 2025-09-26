import { RoutePath } from '../types/route-path.type';
import { RouteItemType } from '../types/route-item-type.enum';
import { isPathNameVariable } from './is-path-name-variable.function';
import { itemizePath } from './itemize-path.function';

export function buildRoute(path: string): RoutePath {
   const { items: parts, method } = itemizePath(path);
   const total = parts.length;

   const parameters = new Set<string>();
   let decrementor = 0;
   let weight = 0;

   const items = parts.map(raw => {
      const isVariable = isPathNameVariable(raw);
      const name = isVariable ? raw.substring(1, raw.length) : raw;

      if (isVariable) {
         decrementor += 1;

         // variable parameter should be unique!
         if (parameters.has(name)) {
            throw new SyntaxError(
               `duplicate "${name}" parameter is found in route: "${path}"`,
            );
         }
      }

      // weight
      weight += total - decrementor;

      return {
         type: isVariable ? RouteItemType.VARIABLE : RouteItemType.LITERAL,
         raw,
         name,
      };
   });

   return {
      method,
      path: `/${parts.join('/')}`,
      items,
      weight,
   };
}
