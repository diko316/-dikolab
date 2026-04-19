import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { RoleModel } from '../types/role-model.interface';
/**
 * Represents a named role that can be assigned
 * to actors to grant use case permissions
 */
export declare class Role<Name extends string> extends UsecaseSymbol<typeof ROLE_TYPE, Name> implements RoleModel<Name> {
    constructor(name: Name);
}
