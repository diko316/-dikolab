import { RoutePath } from './route-path.type';

interface RouteParameters {
   [key: string]: string;
}

export interface RouteMatch extends RoutePath {
   parameters: RouteParameters;
}
