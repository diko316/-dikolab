import { isString } from '../../type-checking/functions/is-string.function';

const HALF_BYTE = 0x80;
const SIX_BITS = 0x3f;
const fromCharCode = String.fromCharCode;

/**
 * Encodes a UTF-8 string to binary
 *
 * @param subject - UTF-8 string
 * @returns Binary-encoded string
 */
export function utf2bin(subject: string): string {
   if (!isString(subject, true)) {
      throw new Error('Invalid [subject] parameter.');
   }

   const utf8: string[] = [];
   let ul = 0;

   for (let c = 0; c < subject.length; c++) {
      let code = subject.charCodeAt(c);

      if (code < HALF_BYTE) {
         utf8[ul++] = fromCharCode(code);
      } else if (code < 0x800) {
         utf8[ul++] = fromCharCode(0xc0 | (code >> 6));
         utf8[ul++] = fromCharCode(HALF_BYTE | (code & SIX_BITS));
      } else if (code < 0xd800 || code > 0xdfff) {
         utf8[ul++] = fromCharCode(0xe0 | (code >> 12));
         utf8[ul++] = fromCharCode(
            HALF_BYTE | ((code >> 6) & SIX_BITS),
         );
         utf8[ul++] = fromCharCode(HALF_BYTE | (code & SIX_BITS));
      } else {
         c++;
         code =
            0x10000 +
            (((code & 0x3ff) << 10) | (subject.charCodeAt(c) & 0x3ff));

         utf8[ul++] = fromCharCode(0xf0 | (code >> 18));
         utf8[ul++] = fromCharCode(
            HALF_BYTE | ((code >> 12) & SIX_BITS),
         );
         utf8[ul++] = fromCharCode(
            HALF_BYTE | ((code >> 6) & SIX_BITS),
         );
         utf8[ul++] = fromCharCode(HALF_BYTE | (code & SIX_BITS));
      }
   }

   return utf8.join('');
}
