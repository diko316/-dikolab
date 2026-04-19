import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
import { isMethod } from '../../type-checking/functions/is-method.function';

const G = globalThis;
const hasSetImmediate = typeof G.setImmediate === 'function';

/**
 * Schedules a callback for async execution
 *
 * @param handler - Callback to schedule
 * @returns Handle for clearing
 */
export function setAsync(handler: AnyFunction): Any {
   if (!isMethod(handler)) {
      throw new Error('Invalid [handler] parameter.');
   }

   if (hasSetImmediate) {
      return G.setImmediate(handler);
   }

   return G.setTimeout(handler, 1);
}

/**
 * Cancels a scheduled async callback
 *
 * @param id - Handle from setAsync
 */
export function clearAsync(id: Any): void {
   try {
      if (hasSetImmediate) {
         G.clearImmediate(id);
      } else {
         G.clearTimeout(id);
      }
   } catch (_e) {
      // ignore
   }
}
