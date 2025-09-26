import { Data } from '../classes/data.class';
import { SessionData } from './session-data.type';

export type AnySessionData = SessionData<object>;

export type DataInSession<Session extends SessionData<object>> =
   Session extends Data & infer Raw ? Data & Raw : never;

type ToMutable<Data extends object> = {
   -readonly [Key in keyof Data]: Data[Key];
};

export type SessionDataToMutable<Session extends AnySessionData> =
   ToMutable<DataInSession<Session>>;
