import { get } from '@dikolab/private-parts';
import {
   AnyUsecaseSymbol,
   UsecaseSymbolId,
   UsecaseSymbolName,
   UsecaseSymbolType,
} from '../types/utility.type';
import { ID_KEY } from '../../utils/constants/symbol-keys.constant';

export function getSymbolId<UsecaseSymbol extends AnyUsecaseSymbol>(
   usecaseSymbol: UsecaseSymbol,
): UsecaseSymbolId<
   UsecaseSymbolType<UsecaseSymbol>,
   UsecaseSymbolName<UsecaseSymbol>
> {
   return get(usecaseSymbol, ID_KEY);
}
