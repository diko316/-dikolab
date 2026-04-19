import { isString, isObject } from '@dikolab/common';

import { Parser } from '../classes/parser.class';
import type { StateMapData } from '../../state/types/state-map.type';

/**
 * Loads a parser from exported JSON data
 *
 * @param json - JSON string or state object
 * @returns Parser loaded from data
 */
export function load(json: string | StateMapData): Parser {
   if (isString(json)) {
      try {
         json = JSON.parse(json) as StateMapData;
      } catch (e) {
         throw new Error(
            'Unable to load from invalid ' +
               'json JSON String parameter: ' +
               String(e),
         );
      }
   } else if (!isObject(json)) {
      throw new Error(
         'Unable to load from invalid json ' + 'Object parameter.',
      );
   }

   const parser = new Parser();

   try {
      parser.fromJSON(json);
   } catch (e) {
      throw new Error(String(e));
   }

   return parser;
}
