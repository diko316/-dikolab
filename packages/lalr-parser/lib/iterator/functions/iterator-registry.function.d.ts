import type { IteratorConstructor } from '../types/iterator.type';
/**
 * Registers an iterator class by name
 *
 * @param name - Iterator identifier
 * @param Class - Iterator class extending
 *   BaseIterator
 * @returns true on success
 */
export declare function registerIterator(name: string, Class: IteratorConstructor): boolean;
export declare function getIterator(name: string): IteratorConstructor | null;
export declare const defaultIterator = "base";
