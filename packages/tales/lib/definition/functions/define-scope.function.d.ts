import { Scope } from '../classes/scope.class';
export declare function defineScope<Type extends string, Title extends string>(name: `${Type}:${Title}`): Scope<import("../../boundary/classes/boundary.class").Boundary<Type, Title>>;
