import type { Any } from '../../typing/types/any.type';
import { clone } from '../../object/functions/clone.function';
import { jsonFind } from './json-find.function';

/**
 * Deep-clones the value at a JSON path
 *
 * @param path - JSON path
 * @param object - Root object
 * @param deep - Whether to deep clone
 * @returns Cloned value, or undefined
 */
export function jsonClone(
   path: string,
   object: Any,
   deep = false,
): Any {
   return clone(jsonFind(path, object), deep);
}
