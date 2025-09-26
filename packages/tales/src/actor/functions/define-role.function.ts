import { Role } from '../classes/role.class';

export function defineRole<Name extends string>(name: Name) {
   return new Role(name);
}
