import { NAME_KEY } from '../../utils/constants/symbol-keys.constant';
import {
   AnyUsecaseSymbol,
   UsecaseSymbolName,
} from '../types/utility.type';

export function getSymbolName<UsecaseSymbol extends AnyUsecaseSymbol>(
   usecaseSymbol: UsecaseSymbol,
) {
   return usecaseSymbol[NAME_KEY] as UsecaseSymbolName<UsecaseSymbol>;
}
