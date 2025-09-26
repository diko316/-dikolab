import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
import { UsecaseSymbolId } from '../types/utility.type';
export declare function getSymbolById<Type extends string, Name extends string>(type: Type, name: Name): UsecaseSymbolModel<Type, Name> | null;
export declare function getSymbolById<Type extends string, Name extends string>(id: UsecaseSymbolId<Type, Name>): UsecaseSymbolModel<Type, Name> | null;
