import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import type { AnyConstructor } from '../../typing/types/any-constructor.type';
/**
 * Creates an instance of a constructor with
 * pre-applied properties
 *
 * @param Class - Constructor to instantiate
 * @param properties - Properties to assign
 * @returns New instance with properties applied
 */
export declare function instantiate(Class: AnyConstructor, overrides?: AnyObject): Any;
