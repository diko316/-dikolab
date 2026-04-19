import { FUNCTION_TO_STRING_PATTERN } from '../constants/function.constant';
import type { AnyFunction } from '../types/utility.type';

export function getFunctionDetails(
   fn: AnyFunction,
): [name: string, parameters: string] {
   const matches = fn.toString().match(FUNCTION_TO_STRING_PATTERN) || [
      '',
      '',
   ];

   return [fn.name, matches[2]];
}
