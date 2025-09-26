import { AnyEventMap } from '../../event/types/event-map.type';
import { AnyList, AnyType } from '../../utils/types/utility.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
export declare function listenSymbolEvent<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>, Params extends UsecaseSymbolEventMap<Source>[Type]>(symbol: Source, type: Type, listener: (...args: Params extends AnyList ? [...Params] : []) => AnyType): void;
