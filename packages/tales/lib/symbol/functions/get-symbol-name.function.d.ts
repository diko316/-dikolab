import { AnyUsecaseSymbol, UsecaseSymbolName } from '../types/utility.type';
export declare function getSymbolName<UsecaseSymbol extends AnyUsecaseSymbol>(usecaseSymbol: UsecaseSymbol): UsecaseSymbolName<UsecaseSymbol>;
