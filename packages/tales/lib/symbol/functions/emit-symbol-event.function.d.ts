import { AnyEventMap } from '../../event/types/event-map.type';
import { AnyList } from '../../utils/types/utility.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
export declare function emitSymbolEvent<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>, Params extends UsecaseSymbolEventMap<Source>[Type]>(symbol: Source, type: Type, ...args: Params extends AnyList ? [...Params] : []): void;
