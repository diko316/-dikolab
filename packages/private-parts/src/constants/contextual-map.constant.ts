import { ContextualPrivatePart } from '../types/contextual-private-part.interface';
import { AccessorMap, InstanceKeysMap } from '../types/utility.type';

export const CONTEXTUAL_ACCESSOR_MAP = new WeakMap<
   ContextualPrivatePart,
   AccessorMap
>();

export const CONTEXTUAL_INSTANCE_KEYS_MAP = new WeakMap<
   ContextualPrivatePart,
   InstanceKeysMap
>();
