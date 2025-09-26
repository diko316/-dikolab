# Tales

## Usage

### Declarations

Defining Boundary and goals

```ts
export const UserDomain = defineScope('Entity:User');

export const UserIsCreated = UserDomain.defineGoal('User is Created');

export const UserHasLoggedIn = UserDomain.defineGoal('User has Logged-in');
```

Defining Use-case

```ts
import { UserDomain } from '../user.domain.ts';
import { UserIsCreated } from '../user.goals.ts';

export const CreateUser = UserDomain.
   as('administrator', 'manager').
   iCan('Create User').
   soThat(UserIsCreated).
   implementedAs(
      (name: string, birthday: Date) => {
         // other processes here...
         return {
            name,
            birthday
         }
      }
   );


```

Defining Actor and roles

```ts
export const Admin = iAm('admin').as(
   // can define 2 or more roles
   'administrator',
   'manager'
);
```

### Execution

Running a Usecase by assuming an Actor

```ts

import { Admin } from './actors/admin.actor.ts';
import { CreateUser } from './user/user-cases/create-user.usecase.ts';

export class SomeUserController {
   async createUser(name: string, birthday: Date): Promise<User> {
      const newUser = await assume(Admin)
         .perform(
            CreateUser,
            name,
            birthday
         );

      // do some side effects here...

      return newUser;
   }
}
```
