import { ContextualPrivatePart } from '../types/contextual-private-part.interface';
import { AccessorMap, AnyPropertyName, InstanceKeyset, InstanceKeysMap, InstanceValueMap, ObjectInstance } from '../types/utility.type';
export declare class ContextualPrivatePartManager implements ContextualPrivatePart {
    protected get accessorKeyMap(): AccessorMap;
    protected get keysetMap(): InstanceKeysMap;
    constructor();
    protected getInstanceKeyset<Instance extends object>(instance: ObjectInstance<Instance>): InstanceKeyset | null;
    protected createInstanceKeyset<Instance extends object>(instance: ObjectInstance<Instance>): InstanceKeyset;
    protected getInstanceValueMap<PropertyName extends AnyPropertyName>(propertyName: PropertyName): InstanceValueMap | null;
    protected createInstanceValueMap<PropertyName extends AnyPropertyName>(propertyName: PropertyName): InstanceValueMap;
    get<Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName): any;
    set<Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName, value: PropertyName extends keyof Instance ? Instance[PropertyName] : any): this;
    clear<Instance extends object>(instance: ObjectInstance<Instance>): this;
    clearAll(): this;
}
