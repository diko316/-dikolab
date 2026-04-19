import { isString } from '../../type-checking/functions/is-string.function';

const fromCharCode = String.fromCharCode;

/**
 * Decodes a binary string to UTF-8
 *
 * @param subject - Binary string
 * @returns UTF-8 decoded string
 */
export function bin2utf(subject: string): string {
   if (!isString(subject, true)) {
      throw new Error('Invalid [subject] parameter.');
   }

   const utf16: string[] = [];
   let ul = 0;

   for (let c = 0; c < subject.length; c++) {
      const code = subject.charCodeAt(c);

      switch (code >> 4) {
         case 0:
         case 1:
         case 2:
         case 3:
         case 4:
         case 5:
         case 6:
         case 7:
            utf16[ul++] = subject.charAt(c);
            break;
         case 12:
         case 13:
            c++;
            utf16[ul++] = fromCharCode(
               ((code & 0x1f) << 6) | (subject.charCodeAt(c) & 0x3f),
            );
            break;
         case 14:
            utf16[ul++] = fromCharCode(
               ((code & 0x0f) << 12) |
                  ((subject.charCodeAt(++c) & 0x3f) << 6) |
                  (subject.charCodeAt(++c) & 0x3f),
            );
            break;
      }
   }

   return utf16.join('');
}
