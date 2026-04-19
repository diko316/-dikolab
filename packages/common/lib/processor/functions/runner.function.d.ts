import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
import { BaseMiddleware } from '../classes/base-middleware.class';
/**
 * Executes registered handlers for a named
 * runner
 *
 * @param name - Runner name
 * @param args - Arguments to pass
 * @param scope - Execution context
 * @returns Result from handler chain
 */
export declare function run(name: string, args?: Any, scope?: Any): Any;
/**
 * Registers a handler for a named runner
 *
 * @param name - Runner name with optional
 *   "before:" or "after:" prefix
 * @param handler - Callback to register
 */
export declare function register(name: string, handler: AnyFunction): void;
/**
 * Clears all handlers for a named runner
 *
 * @param name - Runner name
 * @param after - If true, clear only
 *   after-handlers
 */
export declare function clearRunner(name: string, after?: boolean): void;
/**
 * Returns a BaseMiddleware for a namespace
 *
 * @param name - Namespace identifier
 * @returns Cached middleware instance
 */
export declare function middleware(name: string): BaseMiddleware;
