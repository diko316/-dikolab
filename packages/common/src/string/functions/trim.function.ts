import { isString } from '../../type-checking/functions/is-string.function';

const TRIM_RE = /^\s+|\s+$/g;

/**
 * Trims leading and trailing whitespace
 *
 * @param subject - String to trim
 * @returns Trimmed string
 */
export function trim(subject: string): string {
   if (!isString(subject, true)) {
      throw new Error('Invalid [subject] parameter.');
   }

   return subject ? subject.replace(TRIM_RE, '') : subject;
}
