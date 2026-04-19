type ListNode<T> = [ListNode<T> | null, T];

export class DefineList<T> {
   first: ListNode<T> | null = null;
   last: ListNode<T> | null = null;

   shift(): T | null {
      const item = this.first;

      if (item) {
         const first = item[0];
         this.first = first;
         if (!first) {
            this.last = first;
         }
         return item[1];
      }

      return null;
   }

   pop(): T | null {
      const item = this.last;

      if (item) {
         const last = item[0];
         this.last = last;
         if (!last) {
            this.first = last;
         }
         return item[1];
      }

      return null;
   }

   push(value: T): this {
      const item: ListNode<T> = [null, value];

      if (this.last) {
         this.last[0] = item;
      } else {
         this.first = item;
      }

      this.last = item;

      return this;
   }
}
