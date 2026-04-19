import { Parser } from '../classes/parser.class';

/**
 * Creates a parser with the given grammar
 *
 * @param root - Root grammar rule name
 * @param definitions - Grammar definitions
 * @param exclusions - Token patterns to skip
 * @returns Configured Parser instance
 */
export function define(
   root: string,
   definitions: unknown[],
   exclusions?: unknown[],
): Parser {
   return new Parser(root, definitions, exclusions);
}
