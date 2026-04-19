import type { AnyObject } from '../../typing/types/any-object.type';
/** Copies all properties including non-enumerable */
export declare function assignAll(target: AnyObject, source: AnyObject, defaults?: AnyObject): AnyObject;
/**
 * Copies own enumerable properties from
 * sources onto a target
 *
 * @param target - Object to receive properties
 * @param source - One or more source objects
 * @returns The modified target
 */
export declare function assign(target: AnyObject, source: AnyObject, defaults?: AnyObject | boolean, ownedOnly?: boolean): AnyObject;
