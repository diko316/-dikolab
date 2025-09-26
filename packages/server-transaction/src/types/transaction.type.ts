import { TransactionRequest } from './transaction-request.type';
import { TransactionResponse } from './transaction-response.type';
import { TransactionUrl } from './transaction-url.type';

export interface Transaction extends TransactionUrl {
   readonly request: TransactionRequest;
   readonly response: TransactionResponse;
}
