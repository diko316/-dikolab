import { NULL, UNDEFINED } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import type { SignatureString } from '../../typing/types/signature.type';

const toString = Object.prototype.toString;

/**
 * Returns the Object.prototype.toString tag
 *
 * @param subject - Value to inspect
 * @returns Signature like "[object Object]"
 */
export function signature(subject: Any): SignatureString {
   if (subject === undefined) {
      return UNDEFINED;
   }

   if (
      subject === null ||
      (typeof subject === 'number' && !isFinite(subject))
   ) {
      return NULL;
   }

   return toString.call(subject) as SignatureString;
}
