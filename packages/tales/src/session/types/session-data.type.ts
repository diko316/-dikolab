import { Data } from '../classes/data.class';

export type SessionData<Source extends object> = Readonly<
   Data & Source
>;
