import { ResolveRoles } from '../types/utility.type';
export declare function getOrDefineRoles<Names extends readonly string[]>(...roleNames: Names): ResolveRoles<Names>;
