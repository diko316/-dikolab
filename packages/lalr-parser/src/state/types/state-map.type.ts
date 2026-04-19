/**
 * Reducer entry tuple:
 * `[symbolName, paramCount, ruleIndex]`
 */
export type ReducerEntry = [string, number, number];

/**
 * Serialized state map for JSON
 * export/import of parser definitions
 */
export interface StateMapData {
   augmentedRoot: string;
   root: string;
   start: string;
   states: Record<string, Record<string, string>>;
   reducers: Record<string, ReducerEntry>;
   ends: Record<string, string>;
   exclude: string[];
   symbol: Record<string, string>;
   tokens?: Record<string, unknown>;
}
