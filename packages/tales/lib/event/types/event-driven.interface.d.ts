import type EventEmitter from 'events';
import type { DefaultEventMap, EventMap } from './event-map.type';
import type { EVENT_EMITTER_KEY } from '../constants/event-keys';
export interface EventDriven<Map extends EventMap<Map> = DefaultEventMap> {
    readonly [EVENT_EMITTER_KEY]: EventEmitter<Map>;
}
