export type NegativeTarget = [string, Record<string, number>];

export interface StateObject {
   not: NegativeTarget[];
   [chr: string]: string[] | NegativeTarget[];
}

export interface StateMapData {
   stateGenId: number;
   start: string;
   states: Record<string, StateObject>;
   ends: Record<string, string>;
   priority: string[];
}
