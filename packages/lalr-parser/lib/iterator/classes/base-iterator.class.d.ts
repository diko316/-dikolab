import { Lexeme } from '../../lexeme/classes/lexeme.class';
import type { ActionMap } from '../types/iterator.type';
import type { Parser } from '../../parser/classes/parser.class';
/**
 * LALR pushdown automaton that drives
 * shift-reduce parsing via a state machine
 * with tokenization, shifting, and reducing
 */
export declare class BaseIterator {
    parser: Parser;
    subject: string;
    returns: boolean;
    current: Lexeme | null;
    ready: boolean;
    completed: boolean;
    error: string | null;
    start: string;
    state: string;
    pstate: string;
    params: unknown;
    nextTokenIndex: number;
    cursor: number;
    buffer: [string, Lexeme][];
    actions: ActionMap;
    private handlers;
    constructor(parser: Parser);
    private handleStart;
    private handleTokenize;
    private handleShift;
    private handleReduce;
    private handleSuccess;
    private handleFail;
    isAcceptableToken(token: [string, string, number]): boolean;
    /**
     * Updates the current lexeme value
     *
     * @param value - New value to set
     * @returns This iterator
     */
    update(value: unknown): this;
    /**
     * Resets the iterator state for reuse
     *
     * @returns void
     */
    reset(): void;
    /**
     * Sets the input string to parse
     *
     * @param subject - Input string
     * @returns void
     */
    set(subject: string): void;
    /**
     * Advances the parse and returns the
     * next lexeme, or null when complete,
     * or false on error
     *
     * @returns Lexeme, false, or null
     */
    next(): Lexeme | false | null;
}
