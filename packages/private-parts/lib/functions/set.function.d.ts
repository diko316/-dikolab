import type { AnyPropertyName } from '../types/utility.type';
/**
 * Stores a private property value on an instance
 * in the global store
 *
 * @param instance The object to store data on
 * @param propertyName The private property key
 * @param value The value to store
 */
export declare function set(instance: object, propertyName: AnyPropertyName, value: unknown): void;
