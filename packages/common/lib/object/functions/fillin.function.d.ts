import type { AnyObject } from '../../typing/types/any-object.type';
/**
 * Copies properties from source to target
 * only where target lacks them
 *
 * @param target - Object to fill
 * @param source - Object providing defaults
 * @returns The modified target
 */
export declare function fillin(target: AnyObject, source: AnyObject, hasown?: boolean): AnyObject;
