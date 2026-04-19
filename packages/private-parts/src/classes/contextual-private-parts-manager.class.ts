import {
   CONTEXTUAL_ACCESSOR_MAP,
   CONTEXTUAL_INSTANCE_KEYS_MAP,
} from '../constants/contextual-map.constant';

import type { ContextualPrivatePart } from '../types/contextual-private-part.interface';

import type {
   AccessorMap,
   AnyPropertyName,
   InstanceKeyset,
   InstanceKeysMap,
   InstanceValueMap,
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

   protected getInstanceKeyset(
      instance: object,
   ): InstanceKeyset | null {
      return this.keysetMap.get(instance) || null;
   }

   protected createInstanceKeyset(instance: object): InstanceKeyset {
      const keysetMap = this.keysetMap;

      if (keysetMap.has(instance)) {
         return keysetMap.get(instance) as InstanceKeyset;
      }

      const set: InstanceKeyset = new Set();

      keysetMap.set(instance, set);

      return set;
   }

   protected getInstanceValueMap(
      propertyName: AnyPropertyName,
   ): InstanceValueMap | null {
      return this.accessorKeyMap.get(propertyName) || null;
   }

   protected createInstanceValueMap(
      propertyName: AnyPropertyName,
   ): InstanceValueMap {
      const map = this.accessorKeyMap;

      if (!map.has(propertyName)) {
         map.set(propertyName, new WeakMap());
      }

      return map.get(propertyName) as InstanceValueMap;
   }

   get(instance: object, propertyName: AnyPropertyName) {
      const repo = this.getInstanceValueMap(propertyName);

      if (!repo) {
         return undefined;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return repo.get(instance);
   }

   set(
      instance: object,
      propertyName: AnyPropertyName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
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

   clear(instance: object): this {
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
