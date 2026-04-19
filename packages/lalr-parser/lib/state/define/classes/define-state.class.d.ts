import type { Registry } from '../../builder/classes/registry.class';
import type { ClosureItem } from '../../builder/types/registry.type';
export declare class DefineState {
    id: string;
    registry: Registry;
    items: string[];
    end: [number, string, number] | null;
    tokens: string[];
    pointers: Record<string, DefineState>;
    constructor(registry: Registry, id: string, items?: string[]);
    containsItems(items: string[]): boolean;
    pointTo(token: string, targetState: DefineState): void;
    setEnd(item: ClosureItem): void;
}
