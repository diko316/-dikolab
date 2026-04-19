import { Parser } from '../classes/parser.class';
/**
 * Creates a parser with the given grammar
 *
 * @param root - Root grammar rule name
 * @param definitions - Grammar definitions
 * @param exclusions - Token patterns to skip
 * @returns Configured Parser instance
 */
export declare function define(root: string, definitions: unknown[], exclusions?: unknown[]): Parser;
