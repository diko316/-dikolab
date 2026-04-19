import type { Any } from '../../typing/types/any.type';
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
export declare function jsonEach(path: string, callback: (item: string, last: boolean, ...args: Any[]) => Any, arg1?: Any, arg2?: Any, arg3?: Any, arg4?: Any, arg5?: Any): boolean | null;
