import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
/** Checks if a value is a valid iteration target */
declare function isValidObject(target: Any): target is AnyObject;
export { isValidObject };
/**
 * Iterates own properties of an object or
 * elements of an array-like
 *
 * @param subject - Object or array to iterate
 * @param handler - Callback receiving
 *    (value, key, subject)
 * @param scope - Optional this context
 * @returns The subject for chaining
 */
export declare function each(subject: AnyObject, handler: (value: Any, name: string, subject: AnyObject) => Any, scope?: Any, hasown?: boolean): AnyObject;
