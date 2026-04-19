import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';
/** Checks if a value can be traversed */
declare function isAccessible(subject: Any, item: string): SignatureString | false;
export { isAccessible };
/**
 * Retrieves a value at a JSON path
 *
 * @param path - JSON path string or segments
 * @param object - Root object to search
 * @returns Value at path, or undefined
 */
export declare function jsonFind(path: string, object: Any): Any;
