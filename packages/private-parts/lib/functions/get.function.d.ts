import { AnyPropertyName, ObjectInstance } from '../types/utility.type';
export declare function get<Instance extends object, PropertyName extends AnyPropertyName>(instance: ObjectInstance<Instance>, propertyName: PropertyName): any;
