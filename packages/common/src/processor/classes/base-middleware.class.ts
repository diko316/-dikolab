import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
import { isString } from '../../type-checking/functions/is-string.function';

import {
   run,
   register,
   clearRunner,
} from '../functions/runner.function';

/** Named middleware manager for handler chains */
export class BaseMiddleware {
   readonly access: string;

   /**
    * Creates a new BaseMiddleware
    *
    * @param access - Namespace prefix
    */
   constructor(access: string) {
      this.access = access;
   }

   /**
    * Runs handlers for a namespaced runner
    *
    * @param name - Runner name
    * @param args - Arguments to pass
    * @param scope - Execution context
    * @returns Result from handler chain
    */
   run(name: string, args?: Any[], scope?: Any): Any {
      return run(this.access + name, args, scope);
   }

   /**
    * Registers a handler in this namespace
    *
    * @param name - Runner name
    * @param handler - Callback to register
    * @returns This middleware instance
    */
   register(name: string, handler: AnyFunction): this {
      register(this.access + name, handler);
      return this;
   }

   /**
    * Clears handlers for a namespaced runner
    *
    * @param name - Runner name
    * @param after - If true, clear only
    *   after-handlers
    * @returns This middleware instance
    */
   clear(name: string, after?: boolean): this {
      if (!isString(name)) {
         throw new Error('Invalid [name] parameter.');
      }

      clearRunner(this.access + name, after);
      return this;
   }
}
