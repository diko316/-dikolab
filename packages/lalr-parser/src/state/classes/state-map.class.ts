import { isString, isObject, isArray, contains } from '@dikolab/common';

import type { Item } from '../define/classes/item.class';
import type {
   ReducerEntry,
   StateMapData,
} from '../types/state-map.type';

export class StateMap {
   stateGen = 0;
   symbolGen = 0;
   reduceGen = 0;
   rawStates: Item[] = [];
   debugMode = false;
   finalized = false;

   lookup: Record<string, string> = {};
   symbol: Record<string, string> = {};
   start = '0';
   states: Record<string, Record<string, string>> = {};
   ends: Record<string, string> = {};
   exclude: Record<string, boolean> = {};

   reduceLookup: Record<string, string> = {};
   reducers: Record<string, ReducerEntry> = {};

   root = '';
   augmentedRoot = '';
   endSymbol = '';
   endToken = '';

   constructor(debug?: boolean) {
      this.init(debug);
   }

   private init(debug?: boolean): void {
      const start = '0';
      const end = 'End';
      const tokenEnd = '$';
      const states: Record<string, Record<string, string>> = {};

      this.stateGen = 0;
      this.symbolGen = 0;
      this.reduceGen = 0;

      states[start] = {};
      this.lookup = {};
      this.symbol = {};
      this.start = start;
      this.states = states;
      this.ends = {};
      this.exclude = {};
      this.finalized = false;
      this.rawStates = [];

      this.reduceLookup = {};
      this.reducers = {};
      this.debugMode = debug === true;

      this.setRoot(end);
      this.endSymbol = this.generateSymbol(tokenEnd);
      this.endToken = tokenEnd;
   }

   generateState(): string {
      return 's' + (++this.stateGen).toString(36);
   }

   setRoot(name: string): void {
      this.root = this.generateSymbol(name);
      this.augmentedRoot = this.generateSymbol(name + "'");
   }

   createState(id: string): Record<string, string> {
      const states = this.states;

      if (id in states) {
         return states[id];
      }

      return (states[id] = {});
   }

   createPointer(
      id: string,
      token: string,
      target: string,
   ): Record<string, string> {
      const state = this.createState(id);

      state[token] = target;

      return state;
   }

   generateSymbol(name: string): string {
      const lookup = this.lookup;
      const symbols = this.symbol;
      const access = ':' + name;

      if (access in lookup) {
         return lookup[access];
      }

      const id = this.debugMode
         ? '[' + name + ']'
         : (++this.symbolGen).toString(36);

      lookup[access] = id;
      symbols[id] = name;

      return id;
   }

   generateReduceId(
      name: string,
      params: number,
      ruleIndex: number,
   ): string {
      const lookup = this.reduceLookup;
      const all = this.reducers;
      const access = name + ':' + params + ':' + ruleIndex;

      if (access in lookup) {
         return lookup[access];
      }

      const id = this.debugMode
         ? '[' + name + ':' + params + '>' + ruleIndex + ']'
         : (++this.reduceGen).toString(36);

      lookup[access] = id;
      all[id] = [name, params, ruleIndex];

      return id;
   }

   lookupReducer(id: string): ReducerEntry | false {
      const all = this.reducers;

      if (id in all) {
         return all[id];
      }

      return false;
   }

   lookupSymbol(name: string): string | false {
      const symbols = this.symbol;

      if (name in symbols) {
         return symbols[name];
      }

      return false;
   }

   setReduceState(
      state: string,
      name: string,
      params: number,
      ruleIndex: number,
   ): void {
      const ends = this.ends;
      const id = this.generateReduceId(name, params, ruleIndex);
      const all = this.reducers;

      if (state in ends) {
         const current = all[ends[state]];
         if (current[0] !== name || current[1] !== params) {
            throw new Error(
               'Reduce conflict found ' +
                  this.lookupSymbol(current[0]) +
                  ' ! <- ' +
                  this.lookupSymbol(name),
            );
         }
      } else {
         ends[state] = id;
      }
   }

   reset(): void {
      this.init(this.debugMode);
   }

   finalize(): boolean {
      const list = this.rawStates;

      if (!this.finalized && list) {
         this.finalized = true;

         for (let c = -1, l = list.length; l--; ) {
            list[++c].finalize();
         }

         list.length = 0;

         delete (this as Partial<StateMap>).lookup;
      }

      return this.finalized;
   }

   setExcludes(exclude: unknown): void {
      const current = this.exclude;

      if (isArray(exclude)) {
         const list = exclude as string[];
         for (let c = -1, l = list.length; l--; ) {
            current[list[++c]] = true;
         }
      }
   }

   importStates(definition: StateMapData): boolean {
      if (!isObject(definition)) {
         throw new Error('Invalid Object definition ' + 'parameter.');
      }

      const states = definition.states;
      if (!isObject(states)) {
         throw new Error(
            'Invalid "states" Object in ' + 'definition parameter.',
         );
      }

      const root = definition.root;
      if (!isString(root)) {
         throw new Error(
            'Invalid "root" grammar rule ' + 'in definition parameter.',
         );
      }

      const augmentedRoot = definition.augmentedRoot;
      if (!isString(augmentedRoot)) {
         throw new Error(
            'Invalid "augmentedRoot" grammar ' +
               'rule in definition parameter.',
         );
      }

      const start = definition.start;
      if (!isString(start) || !(start in states)) {
         throw new Error(
            'Invalid "start" state in ' + 'definition parameter.',
         );
      }

      const ends = definition.ends;
      if (!isObject(ends)) {
         throw new Error(
            'Invalid "ends" states in ' + 'definition parameter.',
         );
      }

      const reducers = definition.reducers;
      if (!isObject(reducers)) {
         throw new Error(
            'Invalid production "reducers" ' + 'in definition.',
         );
      }

      const symbolMap = definition.symbol;
      if (!isObject(symbolMap)) {
         throw new Error(
            'Invalid "symbol" map in ' + 'definition parameter.',
         );
      }

      const list = definition.exclude;
      if (!isArray(list)) {
         throw new Error(
            'Invalid "exclude" token in ' + 'definition parameter.',
         );
      }

      const excludeMap: Record<string, boolean> = {};
      for (let c = -1, l = list.length; l--; ) {
         excludeMap[list[++c]] = true;
      }

      this.augmentedRoot = augmentedRoot;
      this.root = root;
      this.start = start;
      this.states = states;
      this.ends = ends;
      this.reducers = reducers;
      this.exclude = excludeMap;
      this.symbol = symbolMap;

      return true;
   }

   toObject(): StateMapData {
      const has = contains;
      const exclude = this.exclude;
      const list: string[] = [];
      let len = 0;

      for (const name in exclude) {
         if (has(exclude, name)) {
            list[len++] = name;
         }
      }

      return {
         augmentedRoot: this.augmentedRoot,
         root: this.root,
         start: this.start,
         states: this.states,
         reducers: this.reducers,
         ends: this.ends,
         exclude: list,
         symbol: this.symbol,
      };
   }

   exportStates(json?: boolean): StateMapData | string | null {
      const current = this.toObject();

      if (json === true) {
         try {
            return JSON.stringify(current);
         } catch (_e) {
            return null;
         }
      }

      return current;
   }
}
