import { isString, isObject, isArray } from '@dikolab/common';

import { Tokenizer } from '@dikolab/tokenizer';

import { StateMap } from '../../state/classes/state-map.class';
import { build } from '../../state/builder/functions/build.function';
import {
   getIterator,
   defaultIterator,
} from '../../iterator/functions/iterator-registry.function';
import type { Lexeme } from '../../lexeme/classes/lexeme.class';
import type { BaseIterator } from '../../iterator/classes/base-iterator.class';
import type { StateMapData } from '../../state/types/state-map.type';
import type { ReducerMap } from '../types/parser.type';

let debugMode = false;

/**
 * LALR(1) parser that compiles grammar
 * definitions into DFA state tables and
 * produces parse trees via shift-reduce
 * parsing
 */
export class Parser {
   tokenizer: Tokenizer;
   map: StateMap;
   ready = false;

   constructor(
      root?: string,
      definition?: unknown[],
      exclude?: unknown[],
   ) {
      this.tokenizer = new Tokenizer();
      this.map = new StateMap(debugMode);

      if (arguments.length) {
         this.define(root!, definition!, exclude);
      }
   }

   /**
    * Defines grammar rules for parsing
    *
    * @param root - Root grammar rule name
    * @param definition - Grammar definitions
    * @param exclude - Token patterns to skip
    * @returns true if grammar is valid
    */
   define(
      root: string,
      definition: unknown[],
      exclude?: unknown[],
   ): boolean {
      if (!isString(root)) {
         throw new Error('Invalid root grammar rule ' + 'parameter.');
      }

      if (!isArray(definition)) {
         throw new Error(
            'Invalid grammar rules ' + 'definition parameter',
         );
      }

      if (!isArray(exclude)) {
         exclude = [];
      }

      const ready = build(
         root,
         this.map,
         this.tokenizer,
         definition,
         exclude,
      );

      this.ready = ready;

      return ready;
   }

   /**
    * Creates an iterator for this parser
    *
    * @param name - Optional named iterator
    * @returns New iterator instance
    */
   iterator(name?: string): BaseIterator {
      let IteratorClass;

      if (name !== undefined) {
         IteratorClass = getIterator(name);
         if (!IteratorClass) {
            throw new Error('Invalid iterator name ' + 'parameter.');
         }
      } else {
         IteratorClass = getIterator(defaultIterator)!;
      }

      return new IteratorClass(this);
   }

   /**
    * Imports parser state from JSON
    *
    * @param json - JSON string or object
    * @returns This parser instance
    */
   fromJSON(json: string | StateMapData): this {
      if (isString(json)) {
         try {
            json = JSON.parse(json) as StateMapData;
         } catch (_e) {
            throw new Error('Invalid JSON String json ' + 'parameter.');
         }
      }

      if (!isObject(json)) {
         throw new Error('Invalid Object json parameter.');
      }

      const data = json;
      const tokenMap = data.tokens;

      if (!isObject(tokenMap)) {
         throw new Error(
            'Invalid "tokens" property of ' + 'json parameter.',
         );
      }

      this.tokenizer.fromJSON(
         tokenMap as unknown as Parameters<
            typeof this.tokenizer.fromJSON
         >[0],
      );
      this.map.importStates(data);
      this.ready = true;

      return this;
   }

   /**
    * Exports parser state as JSON string
    *
    * @returns JSON string
    */
   toJSON(): string {
      return JSON.stringify(this.toObject());
   }

   /**
    * Exports parser state as plain object
    *
    * @returns State map data with tokens
    */
   toObject(): StateMapData {
      if (!this.ready) {
         throw new Error('Grammar rules is not yet ' + 'defined.');
      }

      const obj = this.map.toObject();

      (obj as unknown as Record<string, unknown>).tokens =
         this.tokenizer.toObject();

      return obj;
   }

   /**
    * Parses a string subject using the
    * defined grammar
    *
    * @param subject - Input string to parse
    * @param reducer - Optional callbacks
    * @param iteratorName - Optional iterator
    * @returns Array of lexemes or false
    */
   parse(
      subject: string,
      reducer?: ReducerMap,
      iteratorName?: string,
   ): Lexeme[] | false {
      const rpn: Lexeme[] = [];
      let rl = 0;

      if (!isString(subject)) {
         throw new Error('Invalid string subject ' + 'parameter');
      }

      const iter = isString(iteratorName)
         ? this.iterator(iteratorName)
         : this.iterator();

      if (!iter) {
         throw new Error('Invalid Iterator parameter.');
      }

      if (!isObject(reducer)) {
         reducer = {} as ReducerMap;
      }

      iter.set(subject);

      for (let lexeme = iter.next(); lexeme; lexeme = iter.next()) {
         rpn[rl++] = lexeme;

         const lex = lexeme;
         const name = lex.name!;

         if (name in reducer) {
            const value = reducer[name](name, lex.value, lex);

            if (typeof value !== 'undefined') {
               lex.value = value;
            } else if (lex.params !== 0) {
               lex.value = null;
            }
         }
      }

      return iter.error ? false : rpn;
   }
}

/**
 * Toggles debug mode for new parsers
 *
 * @param isDebugMode - Enable or disable
 * @returns void
 */
export function debug(isDebugMode?: boolean): void {
   debugMode = isDebugMode !== false;
}
