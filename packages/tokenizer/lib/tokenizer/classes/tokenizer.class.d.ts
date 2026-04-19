import type { TokenResult, TokenDefinitionItem } from '../types/tokenizer.type';
import type { StateMapData } from '../../regex/types/state-map.type';
/**
 * NFA-based tokenizer that compiles regex
 * patterns into state machines for lexing
 */
export declare class Tokenizer {
    private map;
    constructor();
    /**
     * Registers token definitions
     *
     * @param definitions - Alternating array
     *   of token names and regex patterns
     * @returns This tokenizer instance
     */
    define(definitions: TokenDefinitionItem[]): this;
    /**
     * Imports a previously exported definition
     *
     * @param data - JSON string or object from
     *   toJSON/toObject
     * @returns This tokenizer instance
     */
    fromJSON(data: string | StateMapData): this;
    /**
     * Exports definitions as a JSON string
     *
     * @returns JSON string of the state map
     */
    toJSON(): string;
    /**
     * Exports definitions as a plain object
     *
     * @returns State map data object
     */
    toObject(): StateMapData;
    /**
     * Extracts the next token from the input
     *
     * @param from - Start index in str
     * @param str - Input string to tokenize
     * @returns Token result or null
     */
    tokenize(from: number, str: string): TokenResult;
}
