import {
   CONTEXTUAL_ACCESSOR_MAP,
   CONTEXTUAL_INSTANCE_KEYS_MAP,
} from '../constants/contextual-map.constant';

import { ContextualPrivatePart } from '../types/contextual-private-part.interface';

import {
   AccessorMap,
   AnyPropertyName,
   InstanceKeyset,
   InstanceKeysMap,
   InstanceValueMap,
   ObjectInstance,
} from '../types/utility.type';

export class ContextualPrivatePartManager
   implements ContextualPrivatePart
{
   protected get accessorKeyMap(): AccessorMap {
      return CONTEXTUAL_ACCESSOR_MAP.get(this) as AccessorMap;
   }

   protected get keysetMap(): InstanceKeysMap {
      return CONTEXTUAL_INSTANCE_KEYS_MAP.get(this) as InstanceKeysMap;
   }

   constructor() {
      CONTEXTUAL_ACCESSOR_MAP.set(this, new Map());
      CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, new WeakMap());
   }

   protected getInstanceKeyset<Instance extends object>(
      instance: ObjectInstance<Instance>,
   ): InstanceKeyset | null {
      return this.keysetMap.get(instance) || null;
   }

   protected createInstanceKeyset<Instance extends object>(
      instance: ObjectInstance<Instance>,
   ): InstanceKeyset {
      const keysetMap = this.keysetMap;

      if (keysetMap.has(instance)) {
         return keysetMap.get(instance) as InstanceKeyset;
      }

      const set: InstanceKeyset = new Set();

      keysetMap.set(instance, set);

      return set;
   }

   protected getInstanceValueMap<PropertyName extends AnyPropertyName>(
      propertyName: PropertyName,
   ): InstanceValueMap | null {
      return this.accessorKeyMap.get(propertyName) || null;
   }

   protected createInstanceValueMap<
      PropertyName extends AnyPropertyName,
   >(propertyName: PropertyName): InstanceValueMap {
      const map = this.accessorKeyMap;

      if (!map.has(propertyName)) {
         map.set(propertyName, new WeakMap());
      }

      return map.get(propertyName) as InstanceValueMap;
   }

   get<Instance extends object, PropertyName extends AnyPropertyName>(
      instance: ObjectInstance<Instance>,
      propertyName: PropertyName,
   ) {
      const repo = this.getInstanceValueMap(propertyName);

      if (!repo) {
         return undefined;
      }

      return repo.get(instance);
   }

   set<Instance extends object, PropertyName extends AnyPropertyName>(
      instance: ObjectInstance<Instance>,
      propertyName: PropertyName,
      value: PropertyName extends keyof Instance
         ? Instance[PropertyName]
         : // eslint-disable-next-line @typescript-eslint/no-explicit-any
           any,
   ): this {
      const repo =
         this.getInstanceValueMap(propertyName) ||
         this.createInstanceValueMap(propertyName);

      const keys =
         this.getInstanceKeyset(instance) ||
         this.createInstanceKeyset(instance);

      // add keys if do not exist
      if (!keys.has(propertyName)) {
         keys.add(propertyName);
      }

      // set or replace value
      repo.set(instance, value);
      return this;
   }

   clear<Instance extends object>(
      instance: ObjectInstance<Instance>,
   ): this {
      const keyset = this.getInstanceKeyset(instance);

      // return early, no keys registered!
      if (!keyset) {
         return this;
      }

      // delete all associated properties by each key
      keyset.forEach((key) => {
         const propertyMap = this.getInstanceValueMap(key);

         // return early, already garbage collected :-D
         if (!propertyMap) {
            return;
         }

         propertyMap.delete(instance);
      });

      // delete keyset
      this.keysetMap.delete(instance);

      return this;
   }

   clearAll(): this {
      // clear instance key map
      CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, new WeakMap());
      // only clear accessor keymap
      this.accessorKeyMap.clear();

      return this;
   }
}
