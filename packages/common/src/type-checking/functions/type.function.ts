import type { Any } from '../../typing/types/any.type';
import type { TypeName } from '../../typing/types/type-name.type';
import {
   BOOLEAN,
   NUMBER,
   STRING,
} from '../constants/signatures.constant';
import { signature } from './signature.function';
import { isNativeObject } from './is-native-object.function';
import { isString } from './is-string.function';

/**
 * Returns a human-readable type name
 *
 * @param subject - Value to inspect
 * @returns Type name like "object", "string",
 *    "null"
 */
export function type(subject: Any, isType: TypeName): boolean {
   switch (isType) {
      case 'scalar':
         switch (signature(subject)) {
            case STRING:
            case NUMBER:
            case BOOLEAN:
               return true;
         }
         return false;

      case 'regexp':
      case 'regex':
         isType = 'RegExp';
         break;

      case 'method':
         isType = 'Function';
         break;

      case 'native':
      case 'nativeObject':
         return isNativeObject(subject);
   }

   if (isString(isType)) {
      const len = isType.length;
      if (len) {
         return (
            signature(subject) ===
            '[object ' +
               isType.charAt(0).toUpperCase() +
               isType.substring(1, len) +
               ']'
         );
      }
   }

   return false;
}
