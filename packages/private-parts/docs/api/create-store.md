# createStore

> Creates an isolated private data store,
> independent from the global store.

## Signature

```ts
function createStore(): ContextualPrivatePartManager
```

## Parameters

None.

## Returns

A `ContextualPrivatePartManager` instance with
the same methods as the global API but operating
on its own isolated storage:

| Method | Description |
|--------|-------------|
| `.get(instance, propertyName)` | Retrieve a value |
| `.set(instance, propertyName, value)` | Store a value |
| `.clear(instance)` | Remove all data for an instance |
| `.clearAll()` | Remove all data from this store |

Data stored in an isolated store is completely
separate from the global store and from other
isolated stores.

## Example

```ts
import {
   get,
   set,
   createStore,
} from '@dikolab/private-parts';

const store = createStore();
const obj = {};

// Global store
set(obj, 'key', 'global');

// Isolated store
store.set(obj, 'key', 'isolated');

console.log(get(obj, 'key'));
// 'global'

console.log(store.get(obj, 'key'));
// 'isolated'
```
