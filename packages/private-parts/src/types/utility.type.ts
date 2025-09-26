export type AnyPropertyName = string | symbol | number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InstanceValueMap = WeakMap<any, any>;

export type AccessorMap = Map<AnyPropertyName, InstanceValueMap>;

export type ObjectInstance<Source> = Source extends unknown
   ? Source
   : never;

export type InstanceKeyset = Set<AnyPropertyName>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InstanceKeysMap = WeakMap<any, InstanceKeyset>;
