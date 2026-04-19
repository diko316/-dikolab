# Private Parts

[![npm version](https://img.shields.io/npm/v/@dikolab/private-parts)](https://www.npmjs.com/package/@dikolab/private-parts)
[![license](https://img.shields.io/npm/l/@dikolab/private-parts)](./LICENSE)

WeakMap storage for private data accessible by object instance and key string.

## Installation

```bash
npm install @dikolab/private-parts
```

## [Release Notes](docs/release-notes.md)

## Usage

Simple Storage of private data using object instance and key string

```ts
import { set, get } from '@dikolab/private-parts';

const instance = {};

const value = 'My value';

set(instance, 'my-key', value);

// yes! you got it back!
console.log('I got my value back? ', get(instance, 'my-key') === value);
```

More advanced storage of Class private properties

```ts
import { get, set } from '@dikolab/private-parts';

class MyProfile {
   get name(): string {
      return get(this, 'name');
   }

   constructor(name: string) {
      set(this, 'name', name);
   }
}
```

To clear values related to Instance, you can use clear(instance) function.

```ts
import { clear, get } from '@dikolab/private-parts';

const myProfile = new MyProfile('test');

clear(myProfile);

// should have Undefined value
console.log('my hidden name? ', get(myProfile, 'name'));
```

To clear all values in order to test something like `beforeEach()` calls in Unit tests, use clearAll().

```ts
import { describe, beforeEach } from 'node:test';
import { clearAll } from '@dikolab/private-parts';

describe('Reset something!', () => {
   beforeEach(() => {
      clearAll();
      // mock declarations here...
   });
});
```

## License

[ISC](./LICENSE)
