import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import {
   END,
   END_EMPTY,
   QUEUE,
   START,
   START_ESCAPED,
   STATE,
   STATE_ACTION,
} from '../constants/json-state-machine.constant';
import { isString } from '../../type-checking/functions/is-string.function';
import { isMethod } from '../../type-checking/functions/is-method.function';

const ERROR_PATH_INVALID = 'Invalid [path] parameter.';

/**
 * Iterates segments of a JSON path, invoking
 * a callback at each level
 *
 * @param path - JSON path string
 * @param callback - Callback for each segment
 * @param arg1 - Extra argument passed to callback
 * @param arg2 - Extra argument passed to callback
 * @param arg3 - Extra argument passed to callback
 * @param arg4 - Extra argument passed to callback
 * @param arg5 - Extra argument passed to callback
 * @returns True if iteration completed
 */
export function jsonEach(
   path: string,
   callback: (item: string, last: boolean, ...args: Any[]) => Any,
   arg1?: Any,
   arg2?: Any,
   arg3?: Any,
   arg4?: Any,
   arg5?: Any,
): boolean | null {
   if (!isString(path)) {
      throw new Error(ERROR_PATH_INVALID);
   }

   if (!isMethod(callback)) {
      throw new Error('Invalid [callback] parameter');
   }

   let buffer: string[] | false = false;
   let bl = 0;
   let state = 'start';
   let stateObject: AnyObject = STATE.start as AnyObject;

   const items: string[] = [];
   let len = 0;
   let pending = 0;

   for (let c = 0; c < path.length; c++) {
      const chr = path.charAt(c);
      const last = c === path.length - 1;

      let next: string;
      if (chr in stateObject) {
         next = stateObject[chr] as string;
      } else if ('default' in stateObject) {
         next = stateObject.default as string;
      } else {
         return null;
      }

      if (state in STATE_ACTION) {
         const actionObject = STATE_ACTION[state] as AnyObject;
         if (next in actionObject) {
            let startQueue = false;

            switch (actionObject[next]) {
               case START:
                  startQueue = true;
               // falls through
               case START_ESCAPED:
                  if (buffer !== false) {
                     return false;
                  }

                  if (startQueue && !last) {
                     buffer = [chr];
                     bl = 1;
                  } else {
                     buffer = [];
                     bl = 0;
                  }

                  if (!last) {
                     break;
                  }
               // falls through
               case QUEUE:
                  if (buffer === false) {
                     return false;
                  }
                  buffer[bl++] = chr;
                  if (!last) {
                     break;
                  }
               // falls through
               case END:
                  if (buffer === false) {
                     return false;
                  }
                  items[len++] = buffer.join('');
                  buffer = false;
                  bl = 0;
                  break;
               case END_EMPTY:
                  if (buffer !== false) {
                     return false;
                  }
                  items[len++] = '';
                  break;
            }
         }
      }

      state = next;
      stateObject = STATE[state] as AnyObject;

      if (pending < len - 1) {
         if (
            callback(
               items[pending++],
               false,
               arg1,
               arg2,
               arg3,
               arg4,
               arg5,
            ) === false
         ) {
            return true;
         }
      }

      if (last) {
         let remaining = len - pending;
         for (; remaining--; ) {
            if (
               callback(
                  items[pending++],
                  !remaining,
                  arg1,
                  arg2,
                  arg3,
                  arg4,
                  arg5,
               ) === false
            ) {
               return true;
            }
         }
         break;
      }
   }

   return true;
}
