import { ItemPointer } from './item-pointer.class';
import type { StateMap } from '../../classes/state-map.class';

export class Item {
   map: StateMap;
   state: string;
   base: Item;
   watched: Item[] = [];
   reduceList: [string, number, number][] = [];
   recursion: Record<string, Item>;
   appliedRecursion: Record<string, boolean> = {};
   references: unknown[] = [];
   observed: [Item, string][] = [];
   nextInQueue: Item | null = null;
   parent: Item | null = null;
   pointer: ItemPointer | null = null;
   finalized = false;

   constructor(
      map: StateMap,
      recursion: Record<string, Item>,
      id?: string,
   ) {
      const list = map.rawStates;

      this.map = map;
      this.state = id || map.generateState();
      this.base = this;
      this.recursion = recursion;

      list[list.length] = this;
   }

   getRecursionItem(ruleId: string): Item | null {
      const recursion = this.recursion;

      return ruleId in recursion ? recursion[ruleId] : null;
   }

   hasRecursion(ruleId: string): Item | null {
      const recursion = this.recursion;

      return ruleId in recursion ? recursion[ruleId] : null;
   }

   setRecursion(ruleId: string): this {
      const recursion = this.recursion;

      recursion[ruleId] = this;

      return this;
   }

   getPointerItem(lexeme: string): Item | null {
      let pointer = this.pointer;

      for (; pointer; pointer = pointer.next) {
         if (pointer.item === lexeme) {
            return pointer.to;
         }
      }

      return null;
   }

   point(lexeme: string, ruleId: string): Item {
      let found = this.getPointerItem(lexeme);

      if (!found) {
         const recursion = this.recursion;

         found = new Item(this.map, recursion);

         found.recursion = recursion;

         this.onSetPointer(new ItemPointer(lexeme, found, ruleId));

         const list = this.watched;

         for (let c = -1, len = list.length; len--; ) {
            const item = list[++c];
            const has = item.getPointerItem(lexeme);
            if (!has) {
               item.onSetPointer(
                  new ItemPointer(lexeme, found, ruleId),
               );
            }
         }
      }

      return found;
   }

   onSetPointer(pointer: ItemPointer): void {
      let last = this.pointer;

      if (last) {
         for (; last.next; last = last.next) {}
         last.next = pointer;
      } else {
         this.base.pointer = pointer;
      }
   }

   observe(item: Item, ruleId: string): void {
      const list = this.observed;

      if (item !== this) {
         list[list.length] = [item, ruleId];
      }
   }

   finalizeObserved(): void {
      const list = this.observed;
      let c = -1;
      let l = list.length;

      for (; l--; ) {
         const item = list[++c][0];

         for (
            let pointer = this.pointer;
            pointer;
            pointer = pointer.next
         ) {
            const lexeme = pointer.item;
            const currentPointer = item.getPointerItem(lexeme);

            if (!currentPointer) {
               item.onSetPointer(
                  new ItemPointer(lexeme, pointer.to, pointer.ruleIds),
               );
            }
         }
      }
   }

   finalize(): void {
      const map = this.map;
      const id = this.state;
      const stateObject = map.states[id];

      let item: ItemPointer | null = this.pointer;

      for (; item; item = item.next) {
         const lexeme = item.item;

         if (!(lexeme in stateObject)) {
            stateObject[lexeme] = item.to.state;
         }
      }

      const list = this.reduceList;
      for (let c = -1, len = list.length; len--; ) {
         const reduceItem = list[++c];
         map.setReduceState(
            id,
            reduceItem[0],
            reduceItem[1],
            reduceItem[2],
         );
      }
   }

   reduce(production: string, params: number, group: number): void {
      const list = this.reduceList;

      list[list.length] = [production, params, group];
   }
}
