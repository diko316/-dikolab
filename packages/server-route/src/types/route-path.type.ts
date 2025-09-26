import type { RouteItem } from './route-item.type';

export interface RoutePath {
   method: string;
   path: string;
   weight: number;
   items: Array<RouteItem>;
}
