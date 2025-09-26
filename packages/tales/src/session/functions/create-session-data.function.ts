import { get, set } from '@dikolab/private-parts';
import { Data } from '../classes/data.class';
import { DATA_KEYS } from '../constants/definition-keys.constant';
import { SessionData } from '../types/session-data.type';

export function createSessionData<Source extends object>(
   source: Source,
): SessionData<Source> {
   const session = new Data();

   const keys = Object.keys(source) as (keyof Source)[];

   keys.forEach((key) => {
      set(session, key, source[key]);
      Object.defineProperty(session, key, {
         enumerable: true,
         configurable: false,
         get() {
            return get(session, key);
         },
      });
   });

   set(session, DATA_KEYS, keys);

   return session as SessionData<Source>;
}
