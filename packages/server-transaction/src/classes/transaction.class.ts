import { StringKeyValue } from '../types/string-key-value.type';
import { TransactionRequest } from '../types/transaction-request.type';
import { TransactionResponse } from '../types/transaction-response.type';
import { TransactionUrl } from '../types/transaction-url.type';
import { Transaction as TransactionModel } from '../types/transaction.type';

const REQUEST_STORE = new WeakMap<Transaction, TransactionRequest>();
const RESPONSE_STORE = new WeakMap<Transaction, TransactionResponse>();

export abstract class Transaction implements TransactionModel {
   readonly method: string;
   readonly path: string;
   readonly parameters: StringKeyValue;
   readonly query: StringKeyValue;

   get request(): TransactionRequest {
      return REQUEST_STORE.get(this);
   }

   get response(): TransactionResponse {
      return RESPONSE_STORE.get(this);
   }

   constructor(rawRequest: any, rawResponse: any) {
      const { method, path, parameters, query } =
         this.createUrlDetails(rawRequest);

      this.method = method;
      this.path = path;
      this.parameters = parameters;
      this.query = query;

      REQUEST_STORE.set(this, this.createRequest(rawRequest));
      RESPONSE_STORE.set(this, this.createResponse(rawResponse));
   }

   protected abstract createUrlDetails<RawRequest>(
      rawRequest: RawRequest,
   ): TransactionUrl;

   protected abstract createRequest<RawRequest>(
      rawRequest: RawRequest,
   ): TransactionRequest;

   protected abstract createResponse<RawResponse>(
      rawResponse: RawResponse,
   ): TransactionResponse;
}
