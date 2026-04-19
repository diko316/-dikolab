import { isRegex, isString, isArray } from '@dikolab/common';

import type { Registry } from '../classes/registry.class';

const NONTERMINAL_RE = /^([A-Z][a-zA-Z]+(\_?[a-zA-Z0-9])*\'?)$/;

export function isTerminal(name: string): boolean {
   return name === '$' || !NONTERMINAL_RE.test(name);
}

export function defineTerminals(
   registry: Registry,
   name: string,
   definitions: RegExp[],
): void {
   for (let c = -1, l = definitions.length; l--; ) {
      const terminal = definitions[++c];

      if (!isRegex(terminal)) {
         throw new Error('Invalid Terminal pattern: ' + terminal);
      }

      if (!registry.registerTerminal(terminal, name)) {
         throw new Error('Invalid Terminal pattern: ' + terminal);
      }
   }
}

export function defineRules(
   registry: Registry,
   name: string,
   definitions: unknown[],
): void {
   for (let c = -1, l = definitions.length; l--; ) {
      let rule = definitions[++c];

      if (isString(rule) || isRegex(rule)) {
         rule = [rule];
      } else if (!isArray(rule)) {
         throw new Error(
            'Invalid Grammar rule ' + 'declared in ' + name,
         );
      }

      const ruleArr = rule as unknown[];
      let rl = ruleArr.length;
      const ruleMask: string[] = [];
      const terminals: Record<number, boolean> = {};

      for (; rl--; ) {
         let lexeme = ruleArr[rl];
         let isTerminalToken: boolean;

         if (isRegex(lexeme)) {
            if (!registry.terminalExist(lexeme)) {
               registry.registerTerminal(lexeme);
            }

            lexeme = '/' + lexeme.source + '/';
            isTerminalToken = true;
         } else if (!isString(lexeme)) {
            throw new Error(
               'Invalid Grammar rule ' + 'declared in ' + name,
            );
         } else {
            isTerminalToken = isTerminal(lexeme);
         }

         ruleMask[rl] = registry.map.generateSymbol(lexeme as string);

         if (isTerminalToken) {
            terminals[rl] = true;
         }
      }

      registry.registerRule(name, ruleMask, terminals);
   }
}
