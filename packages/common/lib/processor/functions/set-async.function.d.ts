import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
/**
 * Schedules a callback for async execution
 *
 * @param handler - Callback to schedule
 * @returns Handle for clearing
 */
export declare function setAsync(handler: AnyFunction): Any;
/**
 * Cancels a scheduled async callback
 *
 * @param id - Handle from setAsync
 */
export declare function clearAsync(id: Any): void;
