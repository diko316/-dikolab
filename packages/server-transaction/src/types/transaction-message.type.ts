import { TransactionHeaders } from './transaction-headers.type';

export interface TransactionMessage {
   readonly headers: TransactionHeaders;
   readonly contentType: string;
}
