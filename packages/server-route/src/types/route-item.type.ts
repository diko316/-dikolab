import type { RouteItemType } from './route-item-type.enum';

export interface RouteItem {
   type: RouteItemType;
   name: string;
   raw: string;
}
