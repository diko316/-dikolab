import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
import { UsecaseSymbolId } from '../types/utility.type';
import { createSymbolId } from './create-symbol-id.function';

export function getSymbolById<Type extends string, Name extends string>(
   type: Type,
   name: Name,
): UsecaseSymbolModel<Type, Name> | null;

export function getSymbolById<Type extends string, Name extends string>(
   id: UsecaseSymbolId<Type, Name>,
): UsecaseSymbolModel<Type, Name> | null;

export function getSymbolById(typeOrId: string, name?: string) {
   const fullId =
      typeof name === 'string'
         ? createSymbolId(typeOrId, name)
         : createSymbolId(typeOrId);

   if (SYMBOL_LOOKUP.has(fullId)) {
      return SYMBOL_LOOKUP.get(fullId);
   }

   return null;
}
