import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';
/**
 * Returns the Object.prototype.toString tag
 *
 * @param subject - Value to inspect
 * @returns Signature like "[object Object]"
 */
export declare function signature(subject: Any): SignatureString;
