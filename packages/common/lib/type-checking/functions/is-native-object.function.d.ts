import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
/**
 * Tests whether a value is a native object
 * (not subclass)
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to AnyObject
 */
export declare function isNativeObject<T extends AnyObject = AnyObject>(subject: Any): subject is T;
