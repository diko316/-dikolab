import { DEFAULT_PATH_VARIABLE_PREFIX } from '../constants/path-variable-prefix.constant';

export function isPathNameVariable(name: string): boolean {
   return `${name}`.charAt(0) === DEFAULT_PATH_VARIABLE_PREFIX;
}
