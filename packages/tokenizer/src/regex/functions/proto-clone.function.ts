/**
 * Clones an object preserving its prototype chain
 * via Object.create — mutations to the clone do not
 * affect the original, but shared prototype
 * properties remain linked.
 */
export function protoClone<T>(instance: T): T {
   return Object.create(instance as object) as T;
}
