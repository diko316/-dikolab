import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { ARRAY } from '../../type-checking/constants/signatures.constant';
import { isString } from '../../type-checking/functions/is-string.function';
import { isObject } from '../../type-checking/functions/is-object.function';
import { isArray } from '../../type-checking/functions/is-array.function';
import { contains } from '../../object/functions/contains.function';
import { assign as objectAssign } from '../../object/functions/assign.function';
import { signature } from '../../type-checking/functions/signature.function';
import { maxObjectIndex } from '../../object/functions/max-object-index.function';
import { jsonParsePath } from './json-parse-path.function';

const ARRAY_INDEX_RE = /^([1-9][0-9]*|0|)$/;
const ERROR_NATIVE_OBJECT =
   'Root [subject] requires native Object to ' +
   'accept non-numeric property name.';

function isJSONWritable(subject: Any): string | false {
   const sig = signature(subject);
   switch (sig) {
      case ARRAY:
      case '[object Object]':
         return sig;
   }
   return false;
}

/**
 * Sets a value at a JSON path only if
 * the path does not already exist
 *
 * @param path - JSON path
 * @param subject - Root object
 * @param value - Default value to set
 * @returns The modified subject
 */
export function jsonFill(
   path: string,
   subject: Any,
   value: Any,
): boolean {
   if (!isString(path)) {
      throw new Error('Invalid [path] parameter.');
   }

   const isSubjectArray = isArray(subject);

   if (!isObject(subject) && !isSubjectArray) {
      return false;
   }

   const parsedPath = jsonParsePath(path);
   if (!parsedPath || !parsedPath.length) {
      return false;
   }

   let parent: Any = subject;
   let parentIndex: string | number = parsedPath[0];

   if (!parentIndex) {
      parentIndex = (maxObjectIndex(parent) as number) + 1;
   }

   const last = parsedPath.length - 1;

   for (let c = 0; c < last; c++) {
      const item = parsedPath[c + 1];
      const arrayIndex = ARRAY_INDEX_RE.test(item);

      if (contains(parent, parentIndex)) {
         let property = parent[parentIndex];
         const writable = isJSONWritable(property);

         if (writable === ARRAY && !arrayIndex) {
            property = objectAssign({} as AnyObject, property);
            delete property.length;
         } else if (!writable) {
            property = arrayIndex ? [property] : { '': property };
         }

         parent[parentIndex] = property;
         parent = property;
      } else if (isSubjectArray && parent === subject && !arrayIndex) {
         throw new Error(ERROR_NATIVE_OBJECT);
      } else {
         const property = arrayIndex ? [] : {};
         parent[parentIndex] = property;
         parent = property;
      }

      parentIndex = item;

      if (!item) {
         parentIndex = (maxObjectIndex(parent) as number) + 1;
      }
   }

   parent[parentIndex] = value;
   return true;
}
