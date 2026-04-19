import { isString } from '../../type-checking/functions/is-string.function';
import { bin2utf } from './bin2utf.function';

const BASE64_MAP =
   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const NOT_BASE64_RE = /[^a-zA-Z0-9+/=]/;
const BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9+/]/;
const ONE_BYTE = 0xff;
const fromCharCode = String.fromCharCode;

/**
 * Decodes a Base64 string
 *
 * @param subject - Base64-encoded string
 * @returns Decoded string
 */
export function decode64(subject: string): string {
   if (!isString(subject, true) || NOT_BASE64_RE.test(subject)) {
      throw new Error('Invalid [subject] parameter.');
   }

   subject = subject.replace(BASE64_EXCESS_REMOVE_RE, '');
   const buffer: string[] = [];
   let bl = 0;
   let excess = 0;

   for (let c = 0; c < subject.length; c++) {
      const code = BASE64_MAP.indexOf(subject.charAt(c));
      const flag = c % 4;
      let chr = 0;

      switch (flag) {
         case 0:
            chr = 0;
            break;
         case 1:
            chr = ((excess << 2) | (code >> 4)) & ONE_BYTE;
            break;
         case 2:
            chr = ((excess << 4) | (code >> 2)) & ONE_BYTE;
            break;
         case 3:
            chr = ((excess << 6) | code) & ONE_BYTE;
      }

      excess = code;

      if (c === subject.length - 1 && flag < 3 && chr < 64) {
         break;
      }

      if (flag) {
         buffer[bl++] = fromCharCode(chr);
      }
   }

   return bin2utf(buffer.join(''));
}
