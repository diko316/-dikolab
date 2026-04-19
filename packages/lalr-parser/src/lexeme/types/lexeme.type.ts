/**
 * Lexeme type codes mapping type names
 * to numeric identifiers
 *
 * - `terminal` (1): leaf token from input
 * - `nonterminal` (2): reduced grammar rule
 * - `compound` (3): composite node
 * - `end` (4): augmented root acceptance
 */
export const LEXEME_TYPE = {
   terminal: 1,
   nonterminal: 2,
   compound: 3,
   end: 4,
} as const;

/** Key of the LEXEME_TYPE mapping */
export type LexemeTypeName = keyof typeof LEXEME_TYPE;

/** Numeric type code from LEXEME_TYPE */
export type LexemeTypeCode = (typeof LEXEME_TYPE)[LexemeTypeName];
