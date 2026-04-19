# Common

[![npm version](https://img.shields.io/npm/v/@dikolab/common)](https://www.npmjs.com/package/@dikolab/common)
[![license](https://img.shields.io/npm/l/@dikolab/common)](./LICENSE)

Common utility helpers for type checking, object
manipulation, JSON path operations, and more.

Migrated from [`libcore`](https://github.com/nicoseta/libcore)
with full TypeScript support.

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
npm install @dikolab/common
```

## Usage

### Type checking

```ts
import {
   isString,
   isNumber,
   isObject,
   isArray,
   isRegex,
   isMethod,
} from '@dikolab/common';

isString('hello');   // true
isNumber(42);        // true
isObject({});        // true
isArray([1, 2, 3]);  // true
isRegex(/abc/);      // true
isMethod(() => {});  // true
```

### Object utilities

```ts
import {
   contains,
   assign,
   clone,
   each,
   compare,
} from '@dikolab/common';

const obj = { a: 1, b: 2 };

contains(obj, 'a');  // true

each(obj, (value, key) => {
   console.log(key, value);
});

const copy = clone(obj);
compare(obj, copy);  // true

const merged = assign({}, obj, { c: 3 });
// { a: 1, b: 2, c: 3 }
```

### String utilities

```ts
import {
   encode64,
   decode64,
   camelize,
   uncamelize,
   trim,
} from '@dikolab/common';

encode64('Good Game!');
// 'R29vZCBHYW1lIQ=='

decode64('R29vZCBHYW1lIQ==');
// 'Good Game!'

camelize('my-component');
// 'myComponent'

uncamelize('myComponent');
// 'my-component'
```

### JSON path

```ts
import {
   jsonFind,
   jsonSet,
   jsonExists,
   jsonClone,
} from '@dikolab/common';

const data = { users: [{ name: 'diko' }] };

jsonFind(data, 'users.0.name');
// 'diko'

jsonExists(data, 'users.0.name');
// true

jsonSet(data, 'users.0.age', 30);
// { users: [{ name: 'diko', age: 30 }] }
```

### Array set operations

```ts
import {
   unionList,
   intersectList,
   differenceList,
} from '@dikolab/common';

unionList([1, 2], [2, 3]);
// [1, 2, 3]

intersectList([1, 2, 3], [2, 3, 4]);
// [2, 3]

differenceList([1, 2, 3], [2, 3, 4]);
// [1]
```

### Environment detection

```ts
import { browser, nodejs } from '@dikolab/common';

if (browser) {
   console.log('Running in a browser');
}

if (nodejs) {
   console.log('Running in Node.js');
}
```

## API

### Type checking

| Function | Description |
|----------|-------------|
| `isString(value)` | Check if value is a string |
| `isNumber(value)` | Check if value is a finite number |
| `isObject(value)` | Check if value is a plain object |
| `isArray(value)` | Check if value is an array |
| `isMethod(value)` | Check if value is a function |
| `isRegex(value)` | Check if value is a RegExp |
| `isDate(value)` | Check if value is a Date |
| `isScalar(value)` | Check if value is a scalar |
| `isThenable(value)` | Check if value is a thenable |
| `isIterable(value)` | Check if value is iterable |
| `isNativeObject(value)` | Check if value is a native object |
| `signature(value)` | Get the type signature string |
| `type(value)` | Get the type name |

### Object utilities

| Function | Description |
|----------|-------------|
| `each(obj, callback)` | Iterate own properties |
| `assign(target, ...sources)` | Merge properties |
| `contains(obj, key)` | Check own property |
| `clone(value)` | Deep clone |
| `compare(a, b)` | Deep equality check |
| `fillin(target, ...sources)` | Fill missing properties |
| `clear(obj)` | Delete all own properties |
| `rehash(obj, callback)` | Remap properties |
| `instantiate(Class, args)` | Create instance with args |

### String utilities

| Function | Description |
|----------|-------------|
| `camelize(str)` | Convert to camelCase |
| `uncamelize(str)` | Convert from camelCase |
| `encode64(str)` | Base64 encode |
| `decode64(str)` | Base64 decode |
| `utf2bin(str)` | UTF-8 to binary |
| `bin2utf(str)` | Binary to UTF-8 |
| `trim(str)` | Trim whitespace |

### JSON path

| Function | Description |
|----------|-------------|
| `jsonFind(data, path)` | Get value at path |
| `jsonSet(data, path, value)` | Set value at path |
| `jsonExists(data, path)` | Check path exists |
| `jsonClone(data)` | Deep clone via JSON path |
| `jsonEach(data, path, cb)` | Iterate at path |
| `jsonCompare(a, b)` | Compare via JSON path |
| `jsonUnset(data, path)` | Remove value at path |
| `jsonFill(data, path, value)` | Fill if missing |
| `jsonParsePath(path)` | Parse path string |

## [Release Notes](docs/release-notes.md)

## License

[ISC](./LICENSE)
