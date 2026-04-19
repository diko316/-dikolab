import { isString, isNumber, isObject, isArray } from '@dikolab/common';
import type { Fragment } from './fragment.class';
import type {
   NegativeTarget,
   StateMapData,
   StateObject,
} from '../types/state-map.type';

export class StateMap {
   priority: string[] = [];
   stateGenId = 0;
   start: string;
   states: Record<string, StateObject>;
   ends: Record<string, string> = {};

   constructor(start?: string) {
      this.start = typeof start === 'string' ? start : 'start';
      this.states = {
         [this.start]: { not: [] },
      };
   }

   generateState(id?: unknown): string {
      if (isString(id)) {
         return id;
      }
      return 's' + ++this.stateGenId;
   }

   /**
    * BFS-flattens NFA fragments into the
    * deterministic state table, mapping
    * fragment IDs to named states.
    */
   finalizeFragments(
      name: string,
      fragment: Fragment,
      endStates: string[],
   ): void {
      const states = this.states;
      const ends = this.ends;
      const processed: Record<string, boolean> = {};
      const idmap: Record<string, string> = {};
      const pending: Fragment[] = [fragment];
      let pl = 1;

      idmap[fragment.state.id!] = this.start;

      for (; pl--; ) {
         const item = pending[0];
         pending.splice(0, 1);

         let state = idmap[item.state.id!];
         if (!(state in states)) {
            states[state] = { not: [] };
         }
         const stateObject = states[state];

         let pointer = item.pointer;
         for (; pointer; pointer = pointer.next) {
            const chr = pointer.chr;
            const to = pointer.to!;
            const id = to.id;

            if (!(id in processed)) {
               processed[id] = true;
               pending[pl++] = to;
            }

            state = to.state.id!;
            if (!(state in idmap)) {
               idmap[state] = this.generateState();
            }
            state = idmap[state];

            if (pointer.negative) {
               const targets = stateObject.not;
               let tl = targets.length;
               const total = tl;

               let not: NegativeTarget | null = null;
               for (; tl--; ) {
                  not = targets[tl];
                  if (not[0] === state) {
                     break;
                  }
                  not = null;
               }

               if (!not) {
                  not = targets[total] = [state, {}];
               }

               const notIndex = not[1];

               if (!(chr in notIndex)) {
                  notIndex[chr] = 1;
               }
            } else {
               if (!(chr in stateObject)) {
                  stateObject[chr] = [];
               }
               const list = stateObject[chr] as string[];
               if (list.indexOf(state) === -1) {
                  list[list.length] = state;
               }
            }
         }
      }

      for (let l = endStates.length; l--; ) {
         ends[idmap[endStates[l]]] = name;
      }
   }

   importDefinition(json: string | StateMapData): this {
      let data: StateMapData;

      if (isString(json)) {
         try {
            data = JSON.parse(json) as StateMapData;
         } catch (_e) {
            throw new Error('Invalid JSON string parameter.');
         }
      } else if (isObject(json)) {
         data = json;
      } else {
         throw new Error('Invalid JSON object parameter.');
      }

      const item = data.stateGenId;
      if (!isNumber(item) || item < 0) {
         throw new Error('Invalid state generator');
      }
      this.stateGenId = item;

      if (!isString(data.start)) {
         throw new Error('Invalid start state name');
      }
      this.start = data.start;

      if (!isObject(data.states)) {
         throw new Error('Invalid state map object');
      }
      this.states = data.states;

      if (!isObject(data.ends)) {
         throw new Error('Invalid end states object');
      }
      this.ends = data.ends;

      if (!isArray(data.priority)) {
         throw new Error('Invalid priority list');
      }
      this.priority = data.priority;

      return this;
   }

   exportDefinition(): StateMapData {
      return {
         stateGenId: this.stateGenId,
         start: this.start,
         states: this.states,
         ends: this.ends,
         priority: this.priority,
      };
   }
}
