import { Writable } from 'node:stream';
import { TransactionMessage } from './transaction-message.type';

export interface TransactionResponse extends TransactionMessage {
   readonly contentWriter: Writable;
   readonly contentWritten: boolean;
   readonly completed: boolean;

   statusCode(code: number): this;
   setHeader(name: string, value: string): this;
   write(content: Buffer): this;
}
