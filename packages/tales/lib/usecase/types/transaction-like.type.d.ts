import { TRANSACTION_SIGNATURE } from '../../utils/constants/symbol-keys.constant';
import { AnyFunction } from '../../utils/types/utility.type';
export type NotTransaction = (object & {
    readonly [TRANSACTION_SIGNATURE]?: never;
}) | number | string | symbol | bigint | boolean | AnyFunction | undefined | null;
export interface TransactionLike {
    readonly [TRANSACTION_SIGNATURE]: 1;
}
