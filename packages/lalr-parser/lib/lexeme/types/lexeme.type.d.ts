/**
 * Lexeme type codes mapping type names
 * to numeric identifiers
 *
 * - `terminal` (1): leaf token from input
 * - `nonterminal` (2): reduced grammar rule
 * - `compound` (3): composite node
 * - `end` (4): augmented root acceptance
 */
export declare const LEXEME_TYPE: {
    readonly terminal: 1;
    readonly nonterminal: 2;
    readonly compound: 3;
    readonly end: 4;
};
/** Key of the LEXEME_TYPE mapping */
export type LexemeTypeName = keyof typeof LEXEME_TYPE;
/** Numeric type code from LEXEME_TYPE */
export type LexemeTypeCode = (typeof LEXEME_TYPE)[LexemeTypeName];
