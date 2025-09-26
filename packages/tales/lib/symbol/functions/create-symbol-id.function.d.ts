import { UsecaseSymbolId } from '../types/utility.type';
export declare function createSymbolId<Type extends string, Name extends string>(type: Type, name: Name): UsecaseSymbolId<Type, Name>;
export declare function createSymbolId<Type extends string, Name extends string>(id: UsecaseSymbolId<Type, Name> | string): UsecaseSymbolId<Type, Name>;
