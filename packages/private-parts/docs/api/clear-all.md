# clearAll

> Clears all private data from every instance
> in the global store.

## Signature

```ts
function clearAll(): void
```

## Parameters

None.

## Returns

`void`

## Example

Useful for resetting state between unit tests:

```ts
import { beforeEach } from 'vitest';
import { clearAll } from '@dikolab/private-parts';

beforeEach(() => {
   clearAll();
});
```
