import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant';
import { InstanceKeyset, ObjectInstance } from '../types/utility.type';

export function getInstanceKeyset<Instance extends object>(
   instance: ObjectInstance<Instance>,
): InstanceKeyset | null {
   return INSTANCE_KEY_MAP.map?.get(instance) || null;
}
