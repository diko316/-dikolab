import { Readable } from 'node:stream';
import { TransactionMessage } from './transaction-message.type';

export interface TransactionRequest extends TransactionMessage {
   readonly contentReader: Readable;
   readonly completed: boolean;

   getHeader(name: string): undefined | string | Array<string>;
   getHeaderNames(): Array<string>;
}
