import { get, set } from '@dikolab/private-parts';
import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant';
import type {
   UsecaseSymbolLike,
   UsecaseSymbolModel,
} from '../types/usecase-symbol-model.interface';
import {
   ID_KEY,
   NAME_KEY,
   TYPE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import type { UsecaseSymbolJSON } from '../types/usecase-symbol-json.interface';
import type { UsecaseSymbolId } from '../types/utility.type';
import { createSymbolId } from '../functions/create-symbol-id.function';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import EventEmitter from 'events';
import type {
   AnyEventMap,
   DefaultEventMap,
} from '../../event/types/event-map.type';

/**
 * Abstract base for all use case domain symbols
 * (actors, roles, boundaries, goals, use cases)
 */
export abstract class UsecaseSymbol<
      Type extends string,
      Name extends string,
      EventMap extends AnyEventMap = DefaultEventMap,
   >
   implements
      UsecaseSymbolModel<Type, Name, EventMap>,
      UsecaseSymbolJSON<Type, Name>
{
   get [TYPE_KEY](): Type {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, TYPE_KEY);
   }

   get [NAME_KEY](): Name {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, NAME_KEY);
   }

   get [ID_KEY](): UsecaseSymbolId<Type, Name> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, ID_KEY);
   }

   get [EVENT_EMITTER_KEY](): EventEmitter<EventMap> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, EVENT_EMITTER_KEY);
   }

   constructor(type: Type, name: Name) {
      const id = createSymbolId(type, name);

      // symbols are unique
      if (SYMBOL_LOOKUP.has(id)) {
         throw new ReferenceError(`Symbol ${id} already exist.`);
      }

      set(
         this,
         EVENT_EMITTER_KEY,
         new EventEmitter({
            captureRejections: true,
         }),
      );
      set(this, TYPE_KEY, type);
      set(this, NAME_KEY, name);
      set(this, ID_KEY, id);

      // register to symbol lookup
      SYMBOL_LOOKUP.set(id, this as UsecaseSymbolLike);
   }

   /** Returns the symbol's unique identifier */
   toString() {
      return this[ID_KEY] as string;
   }

   /** Returns a plain object with type and name */
   toJSON() {
      return {
         type: this[TYPE_KEY],
         name: this[NAME_KEY],
      };
   }
}
