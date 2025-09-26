import { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
import { ID_KEY, NAME_KEY, TYPE_KEY } from '../../utils/constants/symbol-keys.constant';
import { UsecaseSymbolJSON } from '../types/usecase-symbol-json.interface';
import { UsecaseSymbolId } from '../types/utility.type';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import EventEmitter from 'events';
import { AnyEventMap, DefaultEventMap } from '../../event/types/event-map.type';
export declare abstract class UsecaseSymbol<Type extends string, Name extends string, EventMap extends AnyEventMap = DefaultEventMap> implements UsecaseSymbolModel<Type, Name, EventMap>, UsecaseSymbolJSON<Type, Name> {
    get [TYPE_KEY](): Type;
    get [NAME_KEY](): Name;
    get [ID_KEY](): UsecaseSymbolId<Type, Name>;
    get [EVENT_EMITTER_KEY](): EventEmitter<EventMap>;
    constructor(type: Type, name: Name);
    toString(): string;
    toJSON(): {
        type: Type;
        name: Name;
    };
}
