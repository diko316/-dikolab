import { Scope } from '../classes/scope.class';
/**
 * Defines a Boundary and declaration scope.
 *
 * @param name Name of the Boundary in this format `${Type}:${Title}`
 * @returns declaration Scope
 */
export declare function defineScope<Type extends string, Title extends string>(name: `${Type}:${Title}`): Scope<import("../..").Boundary<Type, Title>>;
