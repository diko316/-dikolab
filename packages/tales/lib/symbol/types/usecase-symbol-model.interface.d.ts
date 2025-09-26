import { EventDriven } from '../../event/types/event-driven.interface';
import { AnyEventMap, DefaultEventMap } from '../../event/types/event-map.type';
import { ID_KEY, NAME_KEY, TYPE_KEY } from '../../utils/constants/symbol-keys.constant';
import { UsecaseSymbolId } from './utility.type';
export interface UsecaseSymbolModel<Type extends string, Name extends string, EventMap extends AnyEventMap = DefaultEventMap> extends EventDriven<EventMap> {
    readonly [TYPE_KEY]: Type;
    readonly [NAME_KEY]: Name;
    readonly [ID_KEY]: UsecaseSymbolId<Type, Name>;
    toJSON(): {
        type: Type;
        name: Name;
    };
}
export type UsecaseSymbolLike = UsecaseSymbolModel<string, string>;
