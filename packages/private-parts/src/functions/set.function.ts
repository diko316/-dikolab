import { GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER } from '../constants/global-contextual-private-parts-manager.contsant';
import { AnyPropertyName, ObjectInstance } from '../types/utility.type';

export function set<
   Value,
   Instance extends object,
   PropertyName extends AnyPropertyName,
>(
   instance: ObjectInstance<Instance>,
   propertyName: PropertyName,
   value: Value,
): void {
   GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.set(
      instance,
      propertyName,
      value as PropertyName extends keyof Instance
         ? Instance[PropertyName]
         : // eslint-disable-next-line @typescript-eslint/no-explicit-any
           any,
   );
}
