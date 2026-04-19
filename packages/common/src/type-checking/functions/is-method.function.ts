import { METHOD } from '../constants/signatures.constant';
import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';

const toString = Object.prototype.toString;

/**
 * Tests whether a value is a callable function
 *
 * @param subject - Value to test
 * @returns Type predicate narrowing to AnyFunction
 */
export function isMethod<T extends AnyFunction = AnyFunction>(
   subject: Any,
): subject is T {
   return toString.call(subject) === METHOD;
}
