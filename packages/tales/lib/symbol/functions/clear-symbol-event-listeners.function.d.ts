import { AnyEventMap } from '../../event/types/event-map.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
export declare function clearSymbolEventListeners<Source extends UsecaseSymbolModel<string, string, AnyEventMap>, Type extends keyof UsecaseSymbolEventMap<Source>>(symbol: Source, type: Type): void;
