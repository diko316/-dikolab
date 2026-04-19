import { isString, contains } from '@dikolab/common';

import type { StateMap } from '../../classes/state-map.class';
import type { Tokenizer } from '@dikolab/tokenizer';
import type {
   ClosureItem,
   ClosureResult,
} from '../types/registry.type';

export class Registry {
   tokenizer: Tokenizer;
   map: StateMap;

   ruleLookup: Record<string, string> = {};
   productions: Record<string, string[]> = {};
   closureItems: Record<string, ClosureItem> = {};

   terminals: string[] = [];
   terminalLookup: Record<string, string | string[]> = {};

   stateTagIdGen = 0;
   stateTagId: Record<string, string> = {};
   stateTagIdLookup: Record<string, string> = {};

   constructor(map: StateMap, tokenizer: Tokenizer) {
      this.tokenizer = tokenizer;
      this.map = map;
   }

   hashState(name: string): string {
      const lookup = this.stateTagIdLookup;
      const access = ':' + name;

      if (access in lookup) {
         return lookup[access];
      }

      const id = this.map.debugMode
         ? ':' + name
         : (++this.stateTagIdGen).toString(36);

      lookup[access] = id;
      this.stateTagId[id] = name;

      return id;
   }

   lookupState(id: string): string | null {
      const list = this.stateTagId;

      return id in list ? list[id] : null;
   }

   terminalExist(terminal: string | RegExp): boolean {
      const lookup = this.terminalLookup;

      return isString(terminal)
         ? contains(lookup, terminal)
         : '/' + terminal.source + '/' in lookup;
   }

   registerTerminal(terminal: RegExp, name?: string): string | false {
      const lookup = this.terminalLookup;
      const names = this.terminals;
      const access = this.map.generateSymbol(
         '/' + terminal.source + '/',
      );

      if (!name) {
         name = access;
      }

      if (!(access in lookup)) {
         lookup[access] = name;

         if (access === name) {
            names[names.length] = name;
         } else if (!contains(lookup, name)) {
            names[names.length] = name;
            lookup[name] = [access];
         } else {
            const list = lookup[name] as string[];
            list[list.length] = access;
         }

         this.tokenizer.define([name, terminal]);

         return name;
      }

      return false;
   }

   registerRule(
      name: string,
      mask: string[],
      terminals: Record<number, boolean>,
   ): void {
      const closureItems = this.closureItems;
      let rules = this.productions;
      const ruleIndex = this.ruleLookup;
      let c = -1;
      let l = mask.length + 1;
      let before: ClosureItem | null = null;
      let params = 0;

      if (!(name in rules)) {
         rules[name] = [];
      }

      rules = rules;
      const ruleList = rules[name];
      const ruleCount = ruleList.length + 1;

      for (; l--; ) {
         const items = mask.slice(0);
         items.splice(++c, 0, '.');
         const state = this.hashState(name + '->' + items.join(' '));

         if (!c) {
            if (state in ruleIndex) {
               throw new Error(
                  'Duplicate Grammar Rule ' +
                     'found ' +
                     this.lookupState(state) +
                     ' in production: ' +
                     this.map.lookupSymbol(name),
               );
            }
            ruleIndex[state] = name;

            ruleList[ruleList.length] = state;
         }

         const item: ClosureItem = {
            id: state,
            production: name,
            index: ruleCount,
            before: null,
            after: null,
            terminal: false,
            token: null,
         };

         closureItems[state] = item;

         if (before) {
            item.before = before.id;
            before.after = state;
         }

         before = item;

         if (l) {
            params++;
            item.terminal = c in terminals;
            item.token = mask[c];
         } else {
            item.params = params;
         }
      }
   }

   createClosure(items: string[]): ClosureResult {
      const definitions = this.closureItems;
      const productionItems = this.productions;
      const created: Record<string, boolean> = {};
      const processed: Record<string, number> = {};
      const tokens: [string, string[]][] = [];
      let tl = 0;
      let c = -1;
      let l = items.length;

      items = items.slice(0);

      for (; l--; ) {
         const itemId = items[++c];
         if (itemId in created) {
            items.splice(c--, 1);
            continue;
         }
         created[itemId] = true;
         const item = definitions[itemId];
         const token = item.token;
         const terminal = item.terminal;

         if (token) {
            if (token in processed) {
               const list = tokens[processed[token]][1];
               list[list.length] = item.after!;
            } else {
               processed[token] = tl;
               tokens[tl++] = [token, [item.after!]];

               if (!terminal) {
                  const additional = productionItems[token];
                  items.push(...additional);
                  l += additional.length;
               }
            }
         }
      }

      return [items, tokens];
   }
}
