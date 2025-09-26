import { get } from '@dikolab/private-parts';
import { SessionData } from '../types/session-data.type';
import { AnySessionData, DataInSession } from '../types/utility.type';
import { DATA_KEYS } from '../constants/definition-keys.constant';
import { createSessionData } from './create-session-data.function';

export function assignSessionData<
   Session extends AnySessionData,
   Overrides extends
      | DataInSession<Session>
      | Partial<DataInSession<Session>>,
>(
   session: Session,
   overrides: Overrides,
): SessionData<DataInSession<Session> & Overrides> {
   const keys = get(
      session,
      DATA_KEYS,
   ) as (keyof DataInSession<Session>)[];

   return createSessionData(
      keys.reduce((newSession, key) => {
         newSession[key] = Object.prototype.hasOwnProperty.call(
            newSession,
            key,
         )
            ? overrides[key]
            : get(session, key);

         return newSession;
      }, {} as DataInSession<Session>),
   ) as SessionData<DataInSession<Session> & Overrides>;
}
