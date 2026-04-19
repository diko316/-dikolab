import type { StateMap } from '../../classes/state-map.class';
import type { Tokenizer } from '@dikolab/tokenizer';
import type { ClosureItem, ClosureResult } from '../types/registry.type';
export declare class Registry {
    tokenizer: Tokenizer;
    map: StateMap;
    ruleLookup: Record<string, string>;
    productions: Record<string, string[]>;
    closureItems: Record<string, ClosureItem>;
    terminals: string[];
    terminalLookup: Record<string, string | string[]>;
    stateTagIdGen: number;
    stateTagId: Record<string, string>;
    stateTagIdLookup: Record<string, string>;
    constructor(map: StateMap, tokenizer: Tokenizer);
    hashState(name: string): string;
    lookupState(id: string): string | null;
    terminalExist(terminal: string | RegExp): boolean;
    registerTerminal(terminal: RegExp, name?: string): string | false;
    registerRule(name: string, mask: string[], terminals: Record<number, boolean>): void;
    createClosure(items: string[]): ClosureResult;
}
