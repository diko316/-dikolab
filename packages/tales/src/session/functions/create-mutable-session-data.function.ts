import { get } from '@dikolab/private-parts';
import {
   AnySessionData,
   DataInSession,
   SessionDataToMutable,
} from '../types/utility.type';
import { DATA_KEYS } from '../constants/definition-keys.constant';

export function createMutableSessionData<
   Session extends AnySessionData,
>(session: Session): SessionDataToMutable<Session> {
   return get(session, DATA_KEYS).reduce((data, key) => {
      data[key] = session[key];
      return data;
   }, {} as DataInSession<Session>);
}
