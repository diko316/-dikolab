import { assign } from '@dikolab/common';
import { protoClone } from '../functions/proto-clone.function';
import type { Fragment } from './fragment.class';

export class Pointer {
   negative: boolean;
   repeated = false;
   chr: string;
   to: Fragment | null = null;
   next: Pointer | null = null;

   constructor(chr: string, negative?: boolean) {
      this.chr = chr || '';
      this.negative = negative === true;
   }

   clone(
      overrides?: Record<string, unknown> | false,
   ): [Pointer, Pointer] {
      let pointer: Pointer | null = this as Pointer;
      let from: Pointer | null = null;
      let last: Pointer | null = null;
      const includeNext = overrides !== false;
      const resolvedOverrides = overrides || null;

      for (; pointer; pointer = pointer.next) {
         const created = protoClone(pointer);
         if (resolvedOverrides) {
            assign(
               created as unknown as Record<string, unknown>,
               resolvedOverrides,
            );
         }

         if (from) {
            last!.next = created;
         } else {
            from = created;
         }

         last = created;
         if (!includeNext) {
            break;
         }
      }

      last!.next = null;

      return [from!, last!];
   }

   point(fragment: Fragment): this {
      let pointer: Pointer | null = this as Pointer;

      for (; pointer; pointer = pointer.next) {
         if (!pointer.to) {
            pointer.to = fragment;
         }
      }

      return this;
   }

   last(): Pointer {
      let pointer: Pointer = this;

      for (; pointer.next; pointer = pointer.next) {
         /* traverse to end */
      }

      return pointer;
   }

   range(to: Pointer): [Pointer, Pointer] | null {
      const chr = this.chr;
      const negative = this.negative;

      let from = chr.charCodeAt(0);
      const toCode = to.chr.charCodeAt(0);
      let len = Math.max(toCode - from - 1, 0);

      if (len) {
         let start: Pointer | null = null;
         let end: Pointer | null = null;

         for (; len--; ) {
            const created = new Pointer(
               String.fromCharCode(++from),
               negative,
            );
            if (start) {
               end!.next = created;
            } else {
               start = created;
            }
            end = created;
         }

         return start ? [start, end!] : null;
      }

      return null;
   }
}
