import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import type { AnyArray } from '../../typing/types/any-array.type';
import { isNativeObject } from '../../type-checking/functions/is-native-object.function';
import { isArray } from '../../type-checking/functions/is-array.function';
import { isRegex } from '../../type-checking/functions/is-regex.function';
import { isDate } from '../../type-checking/functions/is-date.function';
import { each } from './each.function';
import { assignAll } from './assign.function';

function cloneObject(
   data: AnyObject,
   parents: Any[],
   cloned: Any[],
): AnyObject {
   const depth = parents.length;
   const recreated: AnyObject = {};
   const context: [AnyObject, Any[], Any[]] = [
      recreated,
      parents,
      cloned,
   ];

   parents[depth] = data;
   cloned[depth] = recreated;

   each(data, onEachClonedProperty, context);

   parents.length = cloned.length = depth;

   return recreated;
}

function cloneArray(
   data: AnyArray,
   parents: Any[],
   cloned: Any[],
): AnyArray {
   const depth = parents.length;
   const recreated: AnyArray = [];
   const context: [AnyArray, Any[], Any[]] = [
      recreated,
      parents,
      cloned,
   ];

   parents[depth] = data;
   cloned[depth] = recreated;

   for (let c = 0; c < data.length; c++) {
      onEachClonedProperty.call(context, data[c], c, data);
   }

   parents.length = cloned.length = depth;

   return recreated;
}

function onEachClonedProperty(
   this: [AnyObject, Any[], Any[]],
   value: Any,
   name: string | number,
): void {
   const native = isNativeObject(value);
   const parents = this[1];
   const clonedArr = this[2];

   if (native || isArray(value)) {
      const index = parents.lastIndexOf(value);
      value =
         index === -1
            ? (native ? cloneObject : cloneArray)(
                 value,
                 parents,
                 clonedArr,
              )
            : clonedArr[index];
   } else {
      value = clone(value, false);
   }

   this[0][name] = value;
}

/**
 * Deep-clones a value including nested objects,
 * arrays, dates, and regexps
 *
 * @param subject - Value to clone
 * @returns Deep copy of the value
 */
export function clone(data: Any, deep = false): Any {
   const native = isNativeObject(data);

   if (native || isArray(data)) {
      if (deep) {
         return native
            ? cloneObject(data as AnyObject, [], [])
            : cloneArray(data as AnyArray, [], []);
      }
      return native
         ? assignAll({}, data as AnyObject)
         : (data as AnyArray).slice(0);
   }

   if (isRegex(data)) {
      return new RegExp(data.source, data.flags);
   }

   if (isDate(data)) {
      return new Date(
         data.getFullYear(),
         data.getMonth(),
         data.getDate(),
         data.getHours(),
         data.getMinutes(),
         data.getSeconds(),
         data.getMilliseconds(),
      );
   }

   return data;
}
