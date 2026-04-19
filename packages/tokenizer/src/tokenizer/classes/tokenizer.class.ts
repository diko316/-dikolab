import { isString, isRegex, isArray } from '@dikolab/common';
import { StateMap } from '../../regex/classes/state-map.class';
import { build } from '../../regex/functions/state-builder.function';
import type {
   TokenResult,
   TokenDefinitionItem,
} from '../types/tokenizer.type';
import type { StateMapData } from '../../regex/types/state-map.type';

/**
 * NFA-based tokenizer that compiles regex
 * patterns into state machines for lexing
 */
export class Tokenizer {
   private map: StateMap;

   constructor() {
      this.map = new StateMap();
   }

   /**
    * Registers token definitions
    *
    * @param definitions - Alternating array
    *   of token names and regex patterns
    * @returns This tokenizer instance
    */
   define(definitions: TokenDefinitionItem[]): this {
      const map = this.map;
      const priority = map.priority;
      let pl = priority.length;

      if (!isArray(definitions)) {
         throw new Error('Invalid definitions parameter.');
      }

      let name: string | null = null;
      let c = -1;
      let len = definitions.length;

      for (; len--; ) {
         const item = definitions[++c];

         if (isString(item)) {
            name = item;
         } else if (isRegex(item)) {
            const source = item.source;
            if (!name) {
               throw new Error('Token is not named ' + source);
            }

            if (priority.indexOf(name) === -1) {
               priority[pl++] = name;
            }
            build(name, source, map);
         }
      }

      return this;
   }

   /**
    * Imports a previously exported definition
    *
    * @param data - JSON string or object from
    *   toJSON/toObject
    * @returns This tokenizer instance
    */
   fromJSON(data: string | StateMapData): this {
      this.map.importDefinition(data);
      return this;
   }

   /**
    * Exports definitions as a JSON string
    *
    * @returns JSON string of the state map
    */
   toJSON(): string {
      return JSON.stringify(this.toObject());
   }

   /**
    * Exports definitions as a plain object
    *
    * @returns State map data object
    */
   toObject(): StateMapData {
      return this.map.exportDefinition();
   }

   /**
    * Extracts the next token from the input
    *
    * @param from - Start index in str
    * @param str - Input string to tokenize
    * @returns Token result or null
    */
   tokenize(from: number, str: string): TokenResult {
      const map = this.map;
      const ends = map.ends;
      const states = map.states;
      const rank = map.priority;
      let cursor: [string, [string, unknown] | null] | null = [
         map.start,
         null,
      ];
      const len = str.length;
      let limit = len - from;
      let index = from - 1;
      let found: [string, number, unknown] | null = null;
      let lastFound: [string, number, unknown] | null = null;

      if (limit === 0) {
         return ['$', '', len + 1];
      } else if (limit < 1) {
         return null;
      }

      for (; limit--; ) {
         const chr = str.charAt(++index);
         let next: [string, unknown] | null = null;

         for (; cursor; cursor = cursor[1] as typeof cursor) {
            const state = cursor[0];
            const pointer = states[state];

            if (state in ends) {
               found = [ends[state], index, found];
            }

            if (chr in pointer) {
               const list = pointer[chr] as string[];

               for (let c = -1, l = list.length; l--; ) {
                  const target = list[++c];
                  next = [target, next];

                  if (target in ends) {
                     found = [ends[target], index + 1, found];
                  }
               }
            }

            const not = pointer.not;
            for (let c = -1, l = not.length; l--; ) {
               const target = not[++c];
               const nmap = target[1];

               if (!(chr in nmap)) {
                  const targetState = target[0];
                  next = [targetState, next];

                  if (targetState in ends) {
                     found = [ends[targetState], index + 1, found];
                  }
               }
            }
         }

         if (found) {
            lastFound = found;
         }

         found = null;

         if (next) {
            cursor = next as typeof cursor;
         } else {
            break;
         }
      }

      let result: [string, number | string, number] | null = null;

      for (
         let pointer = lastFound;
         pointer;
         pointer = pointer[2] as typeof pointer
      ) {
         const idx = pointer[1];
         const priority = rank.indexOf(pointer[0]);

         if (
            !result ||
            idx > (result[1] as number) ||
            priority < result[2]
         ) {
            result = [pointer[0], idx, priority];
         }
      }

      if (result) {
         const idx = result[1] as number;

         if (from === idx) {
            result = null;
         } else {
            result[2] = idx;
            result[1] = str.substring(from, idx);
         }
      }

      return result as TokenResult;
   }
}
