import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';
import {
   ARRAY,
   DATE,
   METHOD,
   OBJECT,
   REGEX,
} from '../../type-checking/constants/signatures.constant';
import { signature } from '../../type-checking/functions/signature.function';
import { isArray } from '../../type-checking/functions/is-array.function';
import { isString } from '../../type-checking/functions/is-string.function';
import { assign as objectAssign } from '../../object/functions/assign.function';
import { jsonEach } from './json-each.function';

const NUMERIC_RE = /^([1-9][0-9]*|0)$/;

/** Checks if a value supports property assignment */
function isWritable(subject: Any): SignatureString | false {
   const sig = signature(subject);
   switch (sig) {
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
         return sig;
   }
   return false;
}

export { isWritable };

function onPopulatePath(
   item: string,
   last: boolean,
   context: Any[],
): boolean {
   const subject = context[1];
   const writable = isWritable(subject);
   let success = false;

   if (!last) {
      if (writable) {
         if (!(item in subject)) {
            subject[item] = {};
            success = true;
         } else if (isWritable(subject[item])) {
            success = true;
         }
      }
      context[1] = success ? subject[item] : undefined;
   } else {
      success = !!writable;
      context[2] = success && item;
   }

   return success;
}

/**
 * Sets a value at a JSON path, creating
 * intermediate objects as needed
 *
 * @param path - JSON path
 * @param subject - Root object
 * @param value - Value to set
 * @param overwrite - Overwrite strategy
 * @returns The modified subject
 */
export function jsonSet(
   path: string,
   subject: Any,
   value: Any,
   overwrite?: boolean | string,
): boolean {
   if (!isString(path)) {
      throw new Error('Invalid [path] parameter.');
   }

   const context: Any[] = [undefined, subject, false];
   jsonEach(path, onPopulatePath, context);
   const name = context[2] as string | false;

   if (name !== false) {
      subject = context[1];
      const valueSignature = isWritable(value);
      const arrayOperation = isArray(subject) && NUMERIC_RE.test(name);

      let current: Any;
      let currentSignature: SignatureString | false | null;

      if (name in subject) {
         current = subject[name];
         currentSignature = isWritable(current);
      } else {
         current = undefined;
         currentSignature = null;
      }

      const canApply = valueSignature && !!currentSignature;
      const arrayPush =
         canApply &&
         valueSignature === ARRAY &&
         currentSignature === ARRAY;

      switch (overwrite) {
         case 'insert':
            overwrite = !arrayOperation;
            if (arrayOperation) {
               subject.splice(Number(name), 0, value);
            }
            break;

         case 'apply':
            overwrite = !canApply;
            if (canApply) {
               objectAssign(current, value);
            }
            break;

         case 'push':
            overwrite = !arrayPush;
            if (arrayPush) {
               current.push(...value);
            }
            break;

         case 'unshift':
            overwrite = !arrayPush;
            if (arrayPush) {
               current.splice(0, 0, ...value);
            }
            break;

         case false:
         // falls through
         default:
            overwrite = !canApply;
            if (canApply) {
               if (arrayPush) {
                  current.push(...value);
               } else {
                  objectAssign(current, value);
               }
            }
      }

      if (overwrite) {
         subject[name] = value;
      }

      return true;
   }

   return false;
}
