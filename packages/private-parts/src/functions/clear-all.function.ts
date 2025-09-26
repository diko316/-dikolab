import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant';
import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant';

export function clearAll(): void {
   INSTANCE_KEY_MAP.map = null;
   ACCESSOR_KEY_MAP.clear();
}
