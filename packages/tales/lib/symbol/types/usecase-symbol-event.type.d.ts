import { UsecaseSymbolModel } from './usecase-symbol-model.interface';
export type UsecaseSymbolEventMap<Source> = Source extends UsecaseSymbolModel<string, string, infer Map> ? Map : never;
