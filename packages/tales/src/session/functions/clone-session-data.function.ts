import { AnySessionData } from '../types/utility.type';

import { createSessionData } from './create-session-data.function';
import { createMutableSessionData } from './create-mutable-session-data.function';

export function cloneSessionData<Session extends AnySessionData>(
   session: Session,
): Session {
   return createSessionData(
      createMutableSessionData(session),
   ) as Session;
}
