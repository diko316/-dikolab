import { Tokenizer } from '@dikolab/tokenizer';
import { StateMap } from '../../state/classes/state-map.class';
import type { Lexeme } from '../../lexeme/classes/lexeme.class';
import type { BaseIterator } from '../../iterator/classes/base-iterator.class';
import type { StateMapData } from '../../state/types/state-map.type';
import type { ReducerMap } from '../types/parser.type';
/**
 * LALR(1) parser that compiles grammar
 * definitions into DFA state tables and
 * produces parse trees via shift-reduce
 * parsing
 */
export declare class Parser {
    tokenizer: Tokenizer;
    map: StateMap;
    ready: boolean;
    constructor(root?: string, definition?: unknown[], exclude?: unknown[]);
    /**
     * Defines grammar rules for parsing
     *
     * @param root - Root grammar rule name
     * @param definition - Grammar definitions
     * @param exclude - Token patterns to skip
     * @returns true if grammar is valid
     */
    define(root: string, definition: unknown[], exclude?: unknown[]): boolean;
    /**
     * Creates an iterator for this parser
     *
     * @param name - Optional named iterator
     * @returns New iterator instance
     */
    iterator(name?: string): BaseIterator;
    /**
     * Imports parser state from JSON
     *
     * @param json - JSON string or object
     * @returns This parser instance
     */
    fromJSON(json: string | StateMapData): this;
    /**
     * Exports parser state as JSON string
     *
     * @returns JSON string
     */
    toJSON(): string;
    /**
     * Exports parser state as plain object
     *
     * @returns State map data with tokens
     */
    toObject(): StateMapData;
    /**
     * Parses a string subject using the
     * defined grammar
     *
     * @param subject - Input string to parse
     * @param reducer - Optional callbacks
     * @param iteratorName - Optional iterator
     * @returns Array of lexemes or false
     */
    parse(subject: string, reducer?: ReducerMap, iteratorName?: string): Lexeme[] | false;
}
/**
 * Toggles debug mode for new parsers
 *
 * @param isDebugMode - Enable or disable
 * @returns void
 */
export declare function debug(isDebugMode?: boolean): void;
