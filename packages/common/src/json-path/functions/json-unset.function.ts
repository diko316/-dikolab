import type { Any } from '../../typing/types/any.type';
import { isString } from '../../type-checking/functions/is-string.function';
import { isArray } from '../../type-checking/functions/is-array.function';
import { jsonEach } from './json-each.function';
import { isWritable } from './json-set.function';

const NUMERIC_RE = /^([1-9][0-9]*|0)$/;

function onRemovePath(
   item: string,
   last: boolean,
   context: Any[],
): boolean {
   const subject = context[1];
   const writable = isWritable(subject);
   let success = false;

   if (!last) {
      if (writable && item in subject) {
         if (isWritable(subject[item])) {
            success = true;
         } else {
            context[3] = true;
         }
      }
      context[1] = success ? subject[item] : undefined;
   } else {
      success = !!writable;
      context[2] = success && item;
      context[3] = true;
   }

   return success;
}

/**
 * Removes a value at a JSON path
 *
 * @param path - JSON path
 * @param subject - Root object
 * @returns The modified subject
 */
export function jsonUnset(path: string, subject: Any): boolean {
   if (!isString(path)) {
      throw new Error('Invalid [path] parameter.');
   }

   const context: Any[] = [undefined, subject, false, false];
   jsonEach(path, onRemovePath, context);

   const name = context[2] as string | false;
   let returnValue = context[3] as boolean;

   if (returnValue && name !== false) {
      subject = context[1];

      if (!(name in subject)) {
         returnValue = false;
      } else {
         if (isArray(subject) && NUMERIC_RE.test(name)) {
            subject.splice(Number(name), 1);
         } else {
            delete subject[name];
            returnValue = !(name in subject);
         }
      }
   }

   return returnValue;
}
