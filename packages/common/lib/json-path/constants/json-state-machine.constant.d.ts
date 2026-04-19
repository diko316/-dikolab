import type { AnyObject } from '../../typing/types/any-object.type';
/** State machine action for starting a token */
export declare const START = "start";
/** State machine action for starting an escaped token */
export declare const START_ESCAPED = "start_escaped";
/** State machine action for queuing a character */
export declare const QUEUE = "queue";
/** State machine action for ending a token */
export declare const END = "end";
/** State machine action for ending an empty token */
export declare const END_EMPTY = "end_empty";
/** State machine transition table for JSON path parsing */
export declare const STATE: AnyObject;
/** State machine action table for JSON path parsing */
export declare const STATE_ACTION: AnyObject;
