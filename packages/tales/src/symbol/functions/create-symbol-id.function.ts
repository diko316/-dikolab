import { UsecaseSymbolId } from '../types/utility.type';

export function createSymbolId<
   Type extends string,
   Name extends string,
>(type: Type, name: Name): UsecaseSymbolId<Type, Name>;

export function createSymbolId<
   Type extends string,
   Name extends string,
>(
   id: UsecaseSymbolId<Type, Name> | string,
): UsecaseSymbolId<Type, Name>;

export function createSymbolId(
   typeOrId: string,
   name?: string,
): string {
   if (typeof name === 'string') {
      return `${typeOrId}<${name}>`;
   }

   return typeOrId;
}
