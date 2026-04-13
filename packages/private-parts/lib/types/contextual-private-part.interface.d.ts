import { AnyPropertyName, ObjectInstance } from './utility.type';
export interface ContextualPrivatePart {
    get<Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName): PropertyName extends keyof Instance ? Instance[PropertyName] : undefined;
    set<Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName, value: PropertyName extends keyof Instance ? Instance[PropertyName] : any): this;
    clear<Instance extends object>(instance: ObjectInstance<Instance>): this;
    clearAll(): this;
}
