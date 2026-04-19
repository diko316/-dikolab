import type { ContextualPrivatePart } from '../types/contextual-private-part.interface';
import type { AccessorMap, AnyPropertyName, InstanceKeyset, InstanceKeysMap, InstanceValueMap } from '../types/utility.type';
/**
 * Manages isolated private data storage using
 * WeakMap-backed property maps
 */
export declare class ContextualPrivatePartManager implements ContextualPrivatePart {
    protected get accessorKeyMap(): AccessorMap;
    protected get keysetMap(): InstanceKeysMap;
    constructor();
    protected getInstanceKeyset(instance: object): InstanceKeyset | null;
    protected createInstanceKeyset(instance: object): InstanceKeyset;
    protected getInstanceValueMap(propertyName: AnyPropertyName): InstanceValueMap | null;
    protected createInstanceValueMap(propertyName: AnyPropertyName): InstanceValueMap;
    /**
     * Retrieves a stored private property value
     *
     * @param instance - Object to read from
     * @param propertyName - Private property key
     * @returns The stored value, or `undefined`
     */
    get(instance: object, propertyName: AnyPropertyName): any;
    /**
     * Stores a private property value on an instance
     *
     * @param instance - Object to store data on
     * @param propertyName - Private property key
     * @param value - Value to store
     */
    set(instance: object, propertyName: AnyPropertyName, value: any): this;
    /**
     * Removes all private data for an instance
     *
     * @param instance - Object whose data to clear
     */
    clear(instance: object): this;
    /** Removes all private data from this store */
    clearAll(): this;
}
