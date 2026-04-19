import { ItemPointer } from './item-pointer.class';
import type { StateMap } from '../../classes/state-map.class';
export declare class Item {
    map: StateMap;
    state: string;
    base: Item;
    watched: Item[];
    reduceList: [string, number, number][];
    recursion: Record<string, Item>;
    appliedRecursion: Record<string, boolean>;
    references: unknown[];
    observed: [Item, string][];
    nextInQueue: Item | null;
    parent: Item | null;
    pointer: ItemPointer | null;
    finalized: boolean;
    constructor(map: StateMap, recursion: Record<string, Item>, id?: string);
    getRecursionItem(ruleId: string): Item | null;
    hasRecursion(ruleId: string): Item | null;
    setRecursion(ruleId: string): this;
    getPointerItem(lexeme: string): Item | null;
    point(lexeme: string, ruleId: string): Item;
    onSetPointer(pointer: ItemPointer): void;
    observe(item: Item, ruleId: string): void;
    finalizeObserved(): void;
    finalize(): void;
    reduce(production: string, params: number, group: number): void;
}
