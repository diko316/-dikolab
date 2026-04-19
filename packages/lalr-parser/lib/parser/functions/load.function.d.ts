import { Parser } from '../classes/parser.class';
import type { StateMapData } from '../../state/types/state-map.type';
/**
 * Loads a parser from exported JSON data
 *
 * @param json - JSON string or state object
 * @returns Parser loaded from data
 */
export declare function load(json: string | StateMapData): Parser;
