import { Parser } from '../classes/parser.class';

/**
 * Checks if a value is a Parser instance
 *
 * @param parser - Value to check
 * @returns true if parser is a Parser
 */
export function isParser(parser: unknown): parser is Parser {
   return parser instanceof Parser;
}
