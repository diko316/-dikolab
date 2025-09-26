import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import { AnyEventMap } from '../../event/types/event-map.type';
import { AnyList, AnyType } from '../../utils/types/utility.type';
import { UsecaseSymbolEventMap } from '../types/usecase-symbol-event.type';
import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';

export function unlistenSymbolEvent<
   Source extends UsecaseSymbolModel<string, string, AnyEventMap>,
   Type extends keyof UsecaseSymbolEventMap<Source>,
   Params extends UsecaseSymbolEventMap<Source>[Type],
>(
   symbol: Source,
   type: Type,
   listener: (
      ...args: Params extends AnyList ? [...Params] : []
   ) => AnyType,
): void {
   symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}
