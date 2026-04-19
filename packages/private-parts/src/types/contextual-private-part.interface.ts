import type { AnyPropertyName } from './utility.type';

export interface ContextualPrivatePart {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   get(instance: object, propertyName: AnyPropertyName): any;

   set(
      instance: object,
      propertyName: AnyPropertyName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
   ): this;

   clear(instance: object): this;

   clearAll(): this;
}
