import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';
import {
   ARRAY,
   BOOLEAN,
   DATE,
   METHOD,
   NUMBER,
   OBJECT,
   REGEX,
   STRING,
} from '../../type-checking/constants/signatures.constant';
import { signature } from '../../type-checking/functions/signature.function';
import { jsonEach } from './json-each.function';

/** Checks if a value can be traversed */
function isAccessible(
   subject: Any,
   item: string,
): SignatureString | false {
   const sig = signature(subject);

   switch (sig) {
      case NUMBER:
         return isFinite(subject) && item in Number.prototype
            ? sig
            : false;
      case STRING:
         return item in String.prototype ? sig : false;
      case BOOLEAN:
         return item in Boolean.prototype ? sig : false;
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
         if (item in subject) {
            return sig;
         }
   }
   return false;
}

export { isAccessible };

function findCallback(
   item: string,
   last: boolean,
   operation: Any[],
): boolean {
   const subject = operation[1];

   if (!isAccessible(subject, item)) {
      operation[0] = undefined;
      return false;
   }

   operation[last ? 0 : 1] = subject[item];
   return true;
}

/**
 * Retrieves a value at a JSON path
 *
 * @param path - JSON path string or segments
 * @param object - Root object to search
 * @returns Value at path, or undefined
 */
export function jsonFind(path: string, object: Any): Any {
   const operation: Any[] = [undefined, object];
   jsonEach(path, findCallback, operation);
   operation[1] = null;
   return operation[0];
}
