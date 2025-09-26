import EventEmitter from 'events';
import { DefaultEventMap, EventMap } from './event-map.type';
import { EVENT_EMITTER_KEY } from '../constants/event-keys';
export interface EventDriven<Map extends EventMap<Map> = DefaultEventMap> {
    readonly [EVENT_EMITTER_KEY]: EventEmitter<Map>;
}
