import type { BaseIterator } from '../classes/base-iterator.class';
/** Maps result codes to next state names */
export type ActionTransitions = Record<number, string>;
/** Maps state names to their transitions */
export type ActionMap = Record<string, ActionTransitions>;
/** Constructor type for iterator classes */
export type IteratorConstructor = new (...args: ConstructorParameters<typeof BaseIterator>) => BaseIterator;
