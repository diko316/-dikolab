import type { Any } from '../../typing/types/any.type';
import type { TypeName } from '../../typing/types/type-name.type';
/**
 * Returns a human-readable type name
 *
 * @param subject - Value to inspect
 * @returns Type name like "object", "string",
 *    "null"
 */
export declare function type(subject: Any, isType: TypeName): boolean;
