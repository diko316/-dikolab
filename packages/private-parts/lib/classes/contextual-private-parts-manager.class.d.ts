import type { ContextualPrivatePart } from '../types/contextual-private-part.interface';
import type { AccessorMap, AnyPropertyName, InstanceKeyset, InstanceKeysMap, InstanceValueMap } from '../types/utility.type';
export declare class ContextualPrivatePartManager implements ContextualPrivatePart {
    protected get accessorKeyMap(): AccessorMap;
    protected get keysetMap(): InstanceKeysMap;
    constructor();
    protected getInstanceKeyset(instance: object): InstanceKeyset | null;
    protected createInstanceKeyset(instance: object): InstanceKeyset;
    protected getInstanceValueMap(propertyName: AnyPropertyName): InstanceValueMap | null;
    protected createInstanceValueMap(propertyName: AnyPropertyName): InstanceValueMap;
    get(instance: object, propertyName: AnyPropertyName): any;
    set(instance: object, propertyName: AnyPropertyName, value: any): this;
    clear(instance: object): this;
    clearAll(): this;
}
