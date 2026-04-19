# get

> Retrieves a private property value from an
> instance in the global store.

## Signature

```ts
function get(
   instance: object,
   propertyName: string | symbol | number,
): unknown
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `instance` | `object` | The object to read from |
| `propertyName` | `string \| symbol \| number` | The private property key |

## Returns

The stored value, or `undefined` if no value has
been set for the given instance and property name.

## Example

```ts
import { get, set } from '@dikolab/private-parts';

const obj = {};

set(obj, 'secret', 42);

console.log(get(obj, 'secret'));
// 42

console.log(get(obj, 'missing'));
// undefined
```
