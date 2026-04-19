import { contains } from '@dikolab/common';

import {
   LEXEME_TYPE,
   type LexemeTypeName,
   type LexemeTypeCode,
} from '../types/lexeme.type';

/**
 * Parse tree node representing a terminal
 * token or reduced nonterminal in the LALR
 * parse tree with parent/child/sibling links
 */
export class Lexeme {
   name: string | null = null;
   rule: string | null = null;
   value: unknown = null;
   reduceArguments: unknown = 0;
   reduceCount = 0;
   from = 0;
   to = 0;

   parent: Lexeme | null = null;
   first: Lexeme | null = null;
   last: Lexeme | null = null;
   next: Lexeme | null = null;
   previous: Lexeme | null = null;

   terminal = false;
   type: LexemeTypeCode = 1;

   symbol!: string;
   lookaheads!: unknown;
   params!: unknown;

   constructor(type: LexemeTypeName) {
      this.terminal = false;
      this.useType(type);
   }

   /**
    * Sets the lexeme type code
    *
    * @param type - Type name key
    * @returns void
    */
   useType(type: string): void {
      const types = LEXEME_TYPE;

      this.type = contains(types, type)
         ? (types as Record<string, LexemeTypeCode>)[type]
         : (types as Record<string, LexemeTypeCode>).token;

      if (this.type === LEXEME_TYPE.terminal) {
         this.terminal = true;
      }
   }
}
