export type AnyPropertyName = string | symbol | number;
export type InstanceValueMap = WeakMap<any, any>;
export type AccessorMap = Map<AnyPropertyName, InstanceValueMap>;
export type ObjectInstance<Source> = Source extends unknown ? Source : never;
export type InstanceKeyset = Set<AnyPropertyName>;
export type InstanceKeysMap = WeakMap<any, InstanceKeyset>;
