import type { AnyPropertyName } from './utility.type';
export interface ContextualPrivatePart {
    get(instance: object, propertyName: AnyPropertyName): any;
    set(instance: object, propertyName: AnyPropertyName, value: any): this;
    clear(instance: object): this;
    clearAll(): this;
}
