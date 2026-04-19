import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
/** Named middleware manager for handler chains */
export declare class BaseMiddleware {
    readonly access: string;
    /**
     * Creates a new BaseMiddleware
     *
     * @param access - Namespace prefix
     */
    constructor(access: string);
    /**
     * Runs handlers for a namespaced runner
     *
     * @param name - Runner name
     * @param args - Arguments to pass
     * @param scope - Execution context
     * @returns Result from handler chain
     */
    run(name: string, args?: Any[], scope?: Any): Any;
    /**
     * Registers a handler in this namespace
     *
     * @param name - Runner name
     * @param handler - Callback to register
     * @returns This middleware instance
     */
    register(name: string, handler: AnyFunction): this;
    /**
     * Clears handlers for a namespaced runner
     *
     * @param name - Runner name
     * @param after - If true, clear only
     *   after-handlers
     * @returns This middleware instance
     */
    clear(name: string, after?: boolean): this;
}
