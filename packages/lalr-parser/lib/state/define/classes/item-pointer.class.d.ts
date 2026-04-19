import type { Item } from './item.class';
export declare class ItemPointer {
    item: string;
    ruleIds: string[];
    to: Item;
    next: ItemPointer | null;
    constructor(lexeme: string, state: Item, ruleId: string | string[]);
}
