import { AnyPropertyName, ObjectInstance } from '../types/utility.type';
export declare function set<Value, Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName, value: Value): void;
