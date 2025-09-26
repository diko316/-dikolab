import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant';

/**
 * Unregisters Symbol. This is only used for running Unit tests.
 */
export function clearSymbols(): void {
   SYMBOL_LOOKUP.clear();
}
