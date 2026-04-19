import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
/** Hierarchical key-value store with JSON path support */
export declare class Registry {
    data: AnyObject;
    /**
     * Retrieves a value by key
     *
     * @param name - Property key
     * @returns Stored value, or undefined
     */
    get(name: string | number): Any;
    /**
     * Sets a value by key or merges an object
     *
     * @param name - Property key or object
     * @param value - Value to store
     * @returns This registry instance
     */
    set(name: string | number | AnyObject, value?: Any): this;
    /**
     * Removes a value by key
     *
     * @param name - Property key
     * @returns This registry instance
     */
    unset(name: string | number): this;
    /**
     * Finds a value using a JSON path
     *
     * @param path - JSON path string
     * @returns Value at path, or undefined
     */
    find(path: string): Any;
    /**
     * Inserts a value at a JSON path
     *
     * @param path - JSON path string
     * @param value - Value to insert
     * @returns This registry instance
     */
    insert(path: string, value: Any): this;
    /**
     * Removes a value at a JSON path
     *
     * @param path - JSON path string
     * @returns This registry instance
     */
    remove(path: string): this;
    /**
     * Checks if a key exists in the store
     *
     * @param name - Property key
     * @returns True if key exists
     */
    exists(name: string | number): boolean;
    /**
     * Checks if a JSON path exists
     *
     * @param path - JSON path string
     * @returns True if path exists
     */
    pathExists(path: string): boolean;
    /**
     * Merges an object into the store
     *
     * @param value - Object to merge
     * @returns This registry instance
     */
    assign(value: AnyObject): this;
    /**
     * Removes all entries from the store
     *
     * @returns This registry instance
     */
    clear(): this;
    /**
     * Deep-clones all stored data
     *
     * @returns Cloned data object
     */
    clone(): AnyObject;
}
/**
 * Creates a new Registry instance
 *
 * @returns New Registry instance
 */
export declare function createRegistry(): Registry;
