# clear

> Clears all private data associated with an
> instance from the global store.

## Signature

```ts
function clear(instance: object): void
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `instance` | `object` | The object whose private data should be removed |

## Returns

`void`

## Example

```ts
import { get, set, clear } from '@dikolab/private-parts';

const obj = {};

set(obj, 'a', 1);
set(obj, 'b', 2);

clear(obj);

console.log(get(obj, 'a'));
// undefined
console.log(get(obj, 'b'));
// undefined
```
