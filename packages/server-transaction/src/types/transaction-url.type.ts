import { StringKeyValue } from './string-key-value.type';

export interface TransactionUrl {
   readonly method: string;
   readonly path: string;
   readonly parameters: StringKeyValue;
   readonly query: StringKeyValue;
}
