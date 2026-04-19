import { isString, isArray, isRegex } from '@dikolab/common';

import {
   isTerminal,
   defineTerminals,
   defineRules,
} from './rule.function';
import { define } from '../../define/functions/define.function';
import { Registry } from '../classes/registry.class';
import type { StateMap } from '../../classes/state-map.class';
import type { Tokenizer } from '@dikolab/tokenizer';

export function build(
   root: string,
   map: StateMap,
   tokenizer: Tokenizer,
   definitions: unknown[],
   exclude?: unknown[],
): boolean {
   let name: string | null = null;
   let terminalDefinition = true;

   map.reset();
   map.setRoot(root);

   const registry = new Registry(map, tokenizer);

   // augmented root — intentional mutation
   definitions.splice(
      definitions.length,
      0,
      map.lookupSymbol(map.augmentedRoot),
      [[root, map.lookupSymbol(map.endSymbol)]],
   );

   for (let c = -1, l = definitions.length; l--; ) {
      const definition = definitions[++c];

      if (isString(definition)) {
         terminalDefinition = isTerminal(definition);
         name = map.generateSymbol(definition);
      } else if (name && isArray(definition)) {
         if (terminalDefinition) {
            defineTerminals(registry, name, definition as RegExp[]);
         } else {
            defineRules(registry, name, definition as unknown[]);
         }
      } else {
         throw new Error('Invalid item in definitions ' + 'parameter.');
      }
   }

   define(registry);

   if (isArray(exclude)) {
      const excludes: string[] = [];
      const excludeArr = exclude;

      for (let c = -1, l = excludeArr.length; l--; ) {
         let definition = excludeArr[++c];
         if (isRegex(definition)) {
            definition = registry.registerTerminal(definition);
         } else if (isString(definition)) {
            definition = map.generateSymbol(definition);
         } else {
            throw new Error(
               'Invalid [exclude] pattern ' + 'parameter.',
            );
         }

         excludes[c] = definition as string;
      }

      map.setExcludes(excludes);
   }

   return true;
}
