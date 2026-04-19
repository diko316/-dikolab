import type { UsecaseSymbolModel } from '../types/usecase-symbol-model.interface';
import { ID_KEY, NAME_KEY, TYPE_KEY } from '../../utils/constants/symbol-keys.constant';
import type { UsecaseSymbolJSON } from '../types/usecase-symbol-json.interface';
import type { UsecaseSymbolId } from '../types/utility.type';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import EventEmitter from 'events';
import type { AnyEventMap, DefaultEventMap } from '../../event/types/event-map.type';
/**
 * Abstract base for all use case domain symbols
 * (actors, roles, boundaries, goals, use cases)
 */
export declare abstract class UsecaseSymbol<Type extends string, Name extends string, EventMap extends AnyEventMap = DefaultEventMap> implements UsecaseSymbolModel<Type, Name, EventMap>, UsecaseSymbolJSON<Type, Name> {
    get [TYPE_KEY](): Type;
    get [NAME_KEY](): Name;
    get [ID_KEY](): UsecaseSymbolId<Type, Name>;
    get [EVENT_EMITTER_KEY](): EventEmitter<EventMap>;
    constructor(type: Type, name: Name);
    /** Returns the symbol's unique identifier */
    toString(): string;
    /** Returns a plain object with type and name */
    toJSON(): {
        type: Type;
        name: Name;
    };
}
