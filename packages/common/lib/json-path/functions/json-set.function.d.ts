import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';
/** Checks if a value supports property assignment */
declare function isWritable(subject: Any): SignatureString | false;
export { isWritable };
/**
 * Sets a value at a JSON path, creating
 * intermediate objects as needed
 *
 * @param path - JSON path
 * @param subject - Root object
 * @param value - Value to set
 * @param overwrite - Overwrite strategy
 * @returns The modified subject
 */
export declare function jsonSet(path: string, subject: Any, value: Any, overwrite?: boolean | string): boolean;
