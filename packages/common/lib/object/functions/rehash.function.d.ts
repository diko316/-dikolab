import type { AnyObject } from '../../typing/types/any-object.type';
/**
 * Creates a new object with remapped keys
 *
 * @param subject - Source object
 * @param handler - Key mapping callback
 * @returns New object with transformed keys
 */
export declare function rehash(target: AnyObject, source: AnyObject, access: AnyObject): AnyObject;
