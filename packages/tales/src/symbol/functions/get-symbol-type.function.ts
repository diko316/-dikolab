import { get } from '@dikolab/private-parts';
import {
   AnyUsecaseSymbol,
   UsecaseSymbolType,
} from '../types/utility.type';
import { TYPE_KEY } from '../../utils/constants/symbol-keys.constant';

export function getSymbolType<UsecaseSymbol extends AnyUsecaseSymbol>(
   usecaseSymbol: UsecaseSymbol,
): UsecaseSymbolType<UsecaseSymbol> {
   return get(usecaseSymbol, TYPE_KEY);
}
