import { isArray } from '@dikolab/common';

import type { Item } from './item.class';

export class ItemPointer {
   item: string;
   ruleIds: string[];
   to: Item;
   next: ItemPointer | null = null;

   constructor(lexeme: string, state: Item, ruleId: string | string[]) {
      this.item = lexeme;
      this.ruleIds = isArray(ruleId) ? ruleId : [ruleId];
      this.to = state;
   }
}
