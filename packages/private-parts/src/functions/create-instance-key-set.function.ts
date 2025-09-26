import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant';
import {
   InstanceKeyset,
   InstanceKeysMap,
   ObjectInstance,
} from '../types/utility.type';

export function createInstanceKeyset<Instance extends object>(
   instance: ObjectInstance<Instance>,
): InstanceKeyset {
   let map: InstanceKeysMap | null = INSTANCE_KEY_MAP.map;

   if (!map) {
      map = INSTANCE_KEY_MAP.map = new WeakMap();
   }

   if (map.has(instance)) {
      return map.get(instance) as InstanceKeyset;
   }

   const set: InstanceKeyset = new Set();

   map.set(instance, set);

   return set;
}
