# Private Parts

[![npm version](https://img.shields.io/npm/v/@dikolab/private-parts)](https://www.npmjs.com/package/@dikolab/private-parts)
[![license](https://img.shields.io/npm/l/@dikolab/private-parts)](./LICENSE)

A simplified alternative to `#private` fields and
`WeakMap` patterns for storing private instance data.

## Why

JavaScript offers two built-in ways to keep data
private on class instances:

- **`#private` fields** — work well for simple
  cases but don't support dynamic keys, don't
  interoperate with decorators or mixins, and
  are difficult to inspect in tests.
- **`WeakMap` per property** — flexible and
  garbage-collection-friendly but requires
  boilerplate to set up, track keys, and clean up.

`@dikolab/private-parts` wraps the `WeakMap`
approach behind a minimal API — `get`, `set`,
`clear`, `clearAll`, and `createStore` — so you
get the benefits of `WeakMap`-based privacy without
the plumbing.

## Platform Support

Platform agnostic. Runs in Node.js and browsers.
Ships four output formats:

| Format | File | Use case |
|--------|------|----------|
| CJS | `lib/index.cjs` | Node.js `require()` |
| ESM | `lib/index.mjs` | Bundlers, Node.js `import` |
| UMD | `lib/index.umd.js` | Browsers, `<script>` tags |
| TypeScript | `src/index.ts` | Deno |

## Installation

```bash
npm install @dikolab/private-parts
```

## Usage

### Basic key-value storage

```ts
import { set, get } from '@dikolab/private-parts';

const instance = {};
const value = 'My value';

set(instance, 'my-key', value);

console.log(get(instance, 'my-key') === value);
// true
```

### Class private properties

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

### Clearing instance data

```ts
import { clear, get } from '@dikolab/private-parts';

const myProfile = new MyProfile('test');

clear(myProfile);

console.log(get(myProfile, 'name'));
// undefined
```

### Resetting all data (testing)

```ts
import { describe, beforeEach } from 'vitest';
import { clearAll } from '@dikolab/private-parts';

describe('Reset something!', () => {
   beforeEach(() => {
      clearAll();
   });
});
```

## Global Store vs Isolated Store

By default, `get`, `set`, `clear`, and `clearAll`
operate on a single **global store** shared across
the entire application. This is convenient but means
unrelated modules can collide if they use the same
property names on the same instance.

`createStore()` returns a
`ContextualPrivatePartManager` — an **isolated
store** with the same `.get()`, `.set()`, `.clear()`,
and `.clearAll()` methods but backed by its own
independent storage. Data in one store is invisible
to every other store.

### When to use each

| Approach | Best for |
|----------|----------|
| Global (`get`, `set`) | Simple cases — a single class or module managing its own private data |
| Isolated (`createStore()`) | Libraries, plugins, or multi-module systems where storage must not leak between concerns |

### Isolation in practice

```ts
import {
   get,
   set,
   createStore,
} from '@dikolab/private-parts';

const storeA = createStore();
const storeB = createStore();
const obj = {};

// Each store is independent
set(obj, 'key', 'global');
storeA.set(obj, 'key', 'store-A');
storeB.set(obj, 'key', 'store-B');

console.log(get(obj, 'key'));
// 'global'
console.log(storeA.get(obj, 'key'));
// 'store-A'
console.log(storeB.get(obj, 'key'));
// 'store-B'
```

### Scoped class using an isolated store

```ts
import { createStore } from '@dikolab/private-parts';

const store = createStore();

class Wallet {
   get balance(): number {
      return store.get(this, 'balance') ?? 0;
   }

   deposit(amount: number) {
      store.set(
         this,
         'balance',
         this.balance + amount,
      );
   }

   withdraw(amount: number) {
      store.set(
         this,
         'balance',
         this.balance - amount,
      );
   }
}
```

Because `store` is module-scoped, no external code
can read or modify `Wallet`'s private data — even
if it imports `get` from `@dikolab/private-parts`
and tries the same property name on the same
instance.

## API

| Function | Description |
|----------|-------------|
| [`get(instance, propertyName)`](docs/api/get.md) | Retrieve a private value |
| [`set(instance, propertyName, value)`](docs/api/set.md) | Store a private value |
| [`clear(instance)`](docs/api/clear.md) | Remove all private data for an instance |
| [`clearAll()`](docs/api/clear-all.md) | Remove all private data from the global store |
| [`createStore()`](docs/api/create-store.md) | Create an isolated private data store |

## [Release Notes](docs/release-notes.md)

## License

[ISC](./LICENSE)
