const CAMEL_RE = /[^a-z]+[a-z]/gi;

function applyCamelize(all: string): string {
   return all.charAt(all.length - 1).toUpperCase();
}

/**
 * Converts a hyphenated string to camelCase
 *
 * @param subject - Hyphenated string
 * @returns camelCase string
 */
export function camelize(subject: string): string {
   return subject.replace(CAMEL_RE, applyCamelize);
}
