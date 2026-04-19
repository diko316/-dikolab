import type { Fragment } from './fragment.class';
import type { StateMapData, StateObject } from '../types/state-map.type';
export declare class StateMap {
    priority: string[];
    stateGenId: number;
    start: string;
    states: Record<string, StateObject>;
    ends: Record<string, string>;
    constructor(start?: string);
    generateState(id?: unknown): string;
    /**
     * BFS-flattens NFA fragments into the
     * deterministic state table, mapping
     * fragment IDs to named states.
     */
    finalizeFragments(name: string, fragment: Fragment, endStates: string[]): void;
    importDefinition(json: string | StateMapData): this;
    exportDefinition(): StateMapData;
}
