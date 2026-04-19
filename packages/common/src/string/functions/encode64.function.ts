import { isString } from '../../type-checking/functions/is-string.function';
import { utf2bin } from './utf2bin.function';

const BASE64_MAP =
   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
 * Encodes a string to Base64
 *
 * @param subject - String to encode
 * @returns Base64-encoded string
 */
export function encode64(subject: string): string {
   if (!isString(subject, true)) {
      throw new Error('Invalid [subject] parameter.');
   }

   subject = utf2bin(subject);
   const buffer: string[] = [];
   let bl = 0;
   let excess = 0;

   for (let c = 0; c < subject.length; c++) {
      const code = subject.charCodeAt(c);
      const flag = c % 3;
      let chr = '';

      switch (flag) {
         case 0:
            chr = BASE64_MAP.charAt((code & 0xfc) >> 2);
            excess = (code & 0x03) << 4;
            break;
         case 1:
            chr = BASE64_MAP.charAt(excess | ((code & 0xf0) >> 4));
            excess = (code & 0x0f) << 2;
            break;
         case 2:
            chr = BASE64_MAP.charAt(excess | ((code & 0xc0) >> 6));
            excess = code & 0x3f;
      }

      buffer[bl++] = chr;

      const end = c === subject.length - 1;
      if (end || flag === 2) {
         buffer[bl++] = BASE64_MAP.charAt(excess);
      }

      if (end) {
         let pad = bl % 4;
         for (pad = pad && 4 - pad; pad--; ) {
            buffer[bl++] = '=';
         }
         break;
      }
   }

   return buffer.join('');
}
