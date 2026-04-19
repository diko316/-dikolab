import type { AnyPropertyName } from '../types/utility.type';
/**
 * Retrieves a private property value from an
 * instance in the global store
 *
 * @param instance The object to read from
 * @param propertyName The private property key
 * @returns The stored value, or undefined
 */
export declare function get(instance: object, propertyName: AnyPropertyName): any;
