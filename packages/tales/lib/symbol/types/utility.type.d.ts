import { AnyEventMap } from '../../event/types/event-map.type';
import { UsecaseSymbolModel } from './usecase-symbol-model.interface';
export type UsecaseSymbolId<Type extends string, Name extends string> = `${Type}<${Name}>`;
export type AnyUsecaseSymbol = UsecaseSymbolModel<string, string, AnyEventMap>;
export type UsecaseSymbolType<Source extends AnyUsecaseSymbol> = Source extends UsecaseSymbolModel<infer Type, string, AnyEventMap> ? Type : never;
export type UsecaseSymbolName<Source extends AnyUsecaseSymbol> = Source extends UsecaseSymbolModel<string, infer Name, AnyEventMap> ? Name : never;
