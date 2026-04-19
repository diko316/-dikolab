/**
 * Clones an object preserving its prototype chain
 * via Object.create — mutations to the clone do not
 * affect the original, but shared prototype
 * properties remain linked.
 */
export declare function protoClone<T>(instance: T): T;
