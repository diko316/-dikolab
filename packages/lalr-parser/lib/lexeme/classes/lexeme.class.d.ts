import { type LexemeTypeName, type LexemeTypeCode } from '../types/lexeme.type';
/**
 * Parse tree node representing a terminal
 * token or reduced nonterminal in the LALR
 * parse tree with parent/child/sibling links
 */
export declare class Lexeme {
    name: string | null;
    rule: string | null;
    value: unknown;
    reduceArguments: unknown;
    reduceCount: number;
    from: number;
    to: number;
    parent: Lexeme | null;
    first: Lexeme | null;
    last: Lexeme | null;
    next: Lexeme | null;
    previous: Lexeme | null;
    terminal: boolean;
    type: LexemeTypeCode;
    symbol: string;
    lookaheads: unknown;
    params: unknown;
    constructor(type: LexemeTypeName);
    /**
     * Sets the lexeme type code
     *
     * @param type - Type name key
     * @returns void
     */
    useType(type: string): void;
}
