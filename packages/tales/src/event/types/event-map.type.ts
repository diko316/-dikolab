import {
   AnyFunction,
   AnyList,
   AnyType,
} from '../../utils/types/utility.type';

export type DefaultEventMap = [never];
export type EventMap<Map> =
   | Record<keyof Map, AnyList>
   | DefaultEventMap;

export type AnyEventMap = DefaultEventMap | Record<string, AnyList>;

export type EventType<Key, Map> = Map extends DefaultEventMap
   ? string | symbol
   : Key extends keyof Map
     ? Key
     : never;

export type EventListener<Key, Map> = Map extends DefaultEventMap
   ? AnyFunction
   : Key extends keyof Map
     ? Map[Key] extends unknown[]
        ? (...args: Map[Key]) => AnyType
        : never
     : never;
type EventParametersRest = [...args: AnyList];

export type EventParameters<Key, Map> = Map extends DefaultEventMap
   ? EventParametersRest
   : Key extends keyof Map
     ? Map[Key] extends AnyList
        ? [...Map[Key]]
        : never
     : never;
