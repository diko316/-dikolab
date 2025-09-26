import { ITEMIZE_PATH_RESOLVE_PATTERN } from '../constants/itemize-path-resolve-pattern.constant';
import { DEFAULT_ROUTE_METHOD } from '../constants/path-method.constant';
import { RouteItemizedPath } from '../types/route-itemized-path.type';

export function itemizePath(raw: string): RouteItemizedPath {
   let method = DEFAULT_ROUTE_METHOD;
   let path = raw.trim();

   // separate method from path
   if (ITEMIZE_PATH_RESOLVE_PATTERN.test(path)) {
      const parts = path.match(ITEMIZE_PATH_RESOLVE_PATTERN);

      if (parts[1]) {
         method = parts[1].trim().toLowerCase();
      }

      path = parts[2];
   }

   return {
      method,
      items: path
         .split('/')
         .map(item => {
            const raw = item.trim();

            return raw ? decodeURIComponent(raw).trim() : '';
         })
         .filter(raw => raw !== ''),
   };
}
