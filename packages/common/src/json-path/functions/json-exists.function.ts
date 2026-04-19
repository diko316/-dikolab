import type { Any } from '../../typing/types/any.type';
import { jsonEach } from './json-each.function';
import { isAccessible } from './json-find.function';

function existsCallback(
   item: string,
   last: boolean,
   context: Any[],
): boolean {
   const subject = context[0];
   const exists = isAccessible(subject, item);

   if (exists) {
      context[0] = subject[item];
   }

   if (last) {
      context[1] = !!exists;
   }

   return !!exists;
}

/**
 * Checks whether a value exists at a
 * JSON path
 *
 * @param subject - Root object
 * @param path - JSON path
 * @returns True if path exists
 */
export function jsonExists(path: string, subject: Any): boolean {
   const operation: Any[] = [subject, false];
   jsonEach(path, existsCallback, operation);
   operation[0] = null;
   return operation[1] as boolean;
}
