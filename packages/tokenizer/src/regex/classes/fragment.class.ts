import { protoClone } from '../functions/proto-clone.function';
import type { Pointer } from './pointer.class';
import type {
   FragmentBuilder,
   FragmentState,
   OutgoingNode,
   RepeatNode,
   SplitNode,
} from '../types/fragment.type';

export class Fragment {
   id: string;
   state: FragmentState;
   builder: FragmentBuilder;
   base: Fragment | null = null;
   splitted: SplitNode | null = null;
   repeated: RepeatNode | null = null;
   pointer: Pointer | null = null;
   lastPointer: Pointer | null = null;
   outgoing: OutgoingNode | null = null;
   lastOutgoing: OutgoingNode | null = null;

   constructor(builder: FragmentBuilder, pointer: Pointer | null) {
      this.id = 'f' + ++builder.fgen;
      this.state = { id: null };
      this.builder = builder;

      if (pointer) {
         this.pointer = pointer;

         let p = pointer;
         for (; p.next; p = p.next) {
            /* traverse to end */
         }
         this.lastPointer = p;

         this.outgoing = this.lastOutgoing = {
            fragment: this,
            next: null,
         };
      }
   }

   /**
    * Links this fragment to operand2 by
    * connecting outgoing edges and propagating
    * splits/repeats through the NFA graph.
    */
   link(operand2: Fragment): Fragment {
      const operand1: Fragment = this;
      let outgoing = operand1.outgoing;
      let split = operand1.splitted;
      let newSplit = operand2.splitted;
      const repeat = operand1.repeated;

      operand2.applyState();

      for (; outgoing; outgoing = outgoing.next) {
         outgoing.fragment.pointer!.point(operand2);
      }

      if (repeat) {
         let last = operand2.lastPointer;

         let rep: RepeatNode | null = repeat;
         for (; rep; rep = rep.next) {
            const clonedPtr = rep.pointer;

            if (!last) {
               operand2.pointer = clonedPtr;
            } else {
               last.next = clonedPtr;
            }

            last = clonedPtr;
         }

         operand2.lastPointer = last;
      }

      const pointer = operand2.pointer;
      if (split && pointer) {
         let startSplit: SplitNode | null = null;
         let endSplit: SplitNode | null = null;

         for (; split; split = split.next) {
            const fragment = split.fragment;
            const cloned = pointer.clone();
            const last = fragment.lastPointer!.last();
            last.next = cloned[0];
            fragment.lastPointer = cloned[1];

            if (fragment.pointer !== operand1.pointer) {
               const created: SplitNode = {
                  fragment,
                  next: null,
               };

               if (!startSplit) {
                  startSplit = created;
               } else {
                  endSplit!.next = created;
               }

               endSplit = created;
            }
         }

         if (endSplit) {
            endSplit.next = newSplit;
            newSplit = startSplit;
         }
      }

      const fragment = operand1.clone();
      fragment.splitted = newSplit;
      fragment.repeated = operand2.repeated;

      fragment.outgoing = operand2.outgoing;
      fragment.lastOutgoing = operand2.lastOutgoing;

      return fragment;
   }

   /**
    * Clones this fragment via prototype chain
    * sharing — the clone shares structural
    * properties with the original but can be
    * independently mutated.
    */
   clone(): this {
      const base = this.base;
      const cloned = protoClone(this);

      if (!base) {
         cloned.base = this;
      }

      cloned.id = 'f' + ++this.builder.fgen;
      return cloned;
   }

   split(repeat?: boolean): this {
      const current = this.splitted;
      const splitNode: SplitNode = {
         fragment: this,
         next: null,
      };
      const fragment = this.clone();

      if (repeat) {
         fragment.repeat();
      }

      if (!current) {
         fragment.splitted = splitNode;
      }

      return fragment;
   }

   repeat(): this {
      const pointer = this.pointer;
      const current = this.repeated;

      if (!current && pointer) {
         const cloned = pointer.clone();

         this.repeated = {
            pointer: cloned[0],
            next: null,
         };
      }

      return this;
   }

   fill(operand2: Fragment): Fragment {
      const operand1: Fragment = this;
      const rangeResult = operand1.pointer!.range(operand2.pointer!);

      if (rangeResult) {
         operand2.state = operand1.state;

         rangeResult[1].next = operand2.pointer;

         operand1.lastPointer!.next = rangeResult[0];

         const fragment = operand1.clone();
         fragment.lastPointer = operand2.lastPointer;

         fragment.outgoing!.next = operand2.outgoing;
         fragment.lastOutgoing = operand2.lastOutgoing;

         return fragment;
      }

      return this.merge(operand2);
   }

   merge(operand2: Fragment): Fragment {
      const operand1: Fragment = this;
      const fragment = operand1.clone();

      operand2.state = operand1.state;

      operand1.lastPointer!.next = operand2.pointer;
      operand1.lastOutgoing!.next = operand2.outgoing;

      fragment.lastPointer = operand2.lastPointer;
      fragment.lastOutgoing = operand2.lastOutgoing;

      let first: SplitNode | null = operand1.splitted;
      let last: SplitNode | null = operand2.splitted;
      fragment.splitted = first || last;

      if (first && last) {
         let item: SplitNode = first;
         for (; item.next; item = item.next) {
            /* traverse to end */
         }
         item.next = last;
      }

      first = null;
      last = null;

      const firstRepeat: RepeatNode | null = operand1.repeated;
      const lastRepeat: RepeatNode | null = operand2.repeated;
      fragment.repeated = firstRepeat || lastRepeat;

      if (firstRepeat && lastRepeat) {
         let item: RepeatNode = firstRepeat;
         for (; item.next; item = item.next) {
            /* traverse to end */
         }
         item.next = lastRepeat;
      }

      return fragment;
   }

   applyState(): FragmentState {
      const state = this.state;

      if (!state.id) {
         state.id = 's' + ++this.builder.gen;
      }

      return state;
   }
}
