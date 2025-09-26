import { get, set } from '@dikolab/private-parts';
import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant';
import {
   UsecaseSymbolLike,
   UsecaseSymbolModel,
} from '../types/usecase-symbol-model.interface';
import {
   ID_KEY,
   NAME_KEY,
   TYPE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { UsecaseSymbolJSON } from '../types/usecase-symbol-json.interface';
import { UsecaseSymbolId } from '../types/utility.type';
import { createSymbolId } from '../functions/create-symbol-id.function';
import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys';
import EventEmitter from 'events';
import {
   AnyEventMap,
   DefaultEventMap,
} from '../../event/types/event-map.type';

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
      return get(this, TYPE_KEY);
   }

   get [NAME_KEY](): Name {
      return get(this, NAME_KEY);
   }

   get [ID_KEY](): UsecaseSymbolId<Type, Name> {
      return get(this, ID_KEY);
   }

   get [EVENT_EMITTER_KEY](): EventEmitter<EventMap> {
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

   toString() {
      return this[ID_KEY] as string;
   }

   toJSON() {
      return {
         type: this[TYPE_KEY] as Type,
         name: this[NAME_KEY] as Name,
      };
   }
}
