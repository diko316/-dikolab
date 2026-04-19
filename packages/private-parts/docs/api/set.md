# set

> Stores a private property value on an instance
> in the global store.

## Signature

```ts
function set(
   instance: object,
   propertyName: string | symbol | number,
   value: unknown,
): void
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `instance` | `object` | The object to store data on |
| `propertyName` | `string \| symbol \| number` | The private property key |
| `value` | `unknown` | The value to store |

## Returns

`void`

## Example

```ts
import { get, set } from '@dikolab/private-parts';

class Counter {
   get count(): number {
      return get(this, 'count') ?? 0;
   }

   increment() {
      set(this, 'count', this.count + 1);
   }
}

const counter = new Counter();
counter.increment();
console.log(counter.count);
// 1
```
