const UNCAMEL_RE = /\-*[A-Z]/g;

function applyUncamelize(all: string): string {
   return '-' + all.charAt(all.length - 1).toLowerCase();
}

/**
 * Converts camelCase to hyphen-separated
 *
 * @param subject - camelCase string
 * @returns Hyphenated string
 */
export function uncamelize(subject: string): string {
   return subject.replace(UNCAMEL_RE, applyUncamelize);
}
