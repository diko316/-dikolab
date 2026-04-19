# Tokenizer

[![npm version](https://img.shields.io/npm/v/@dikolab/tokenizer)](https://www.npmjs.com/package/@dikolab/tokenizer)
[![license](https://img.shields.io/npm/l/@dikolab/tokenizer)](./LICENSE)

NFA-based tokenizer that converts regex patterns
into state machines for lexing input strings.

Migrated from [`libcore-tokenizer`](https://github.com/nicoseta/libcore-tokenizer)
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
npm install @dikolab/tokenizer
```

## Usage

### Defining tokens and tokenizing

```ts
import { Tokenizer } from '@dikolab/tokenizer';

const tokenizer = new Tokenizer();
const subject = '12345abc67890';

// Define tokens with name-pattern pairs
tokenizer.define([
   'number',    /[0-9]+/,
   'sequence',  /[a-c]+/,
                /[d-z]+/,
                /[A-Z]+/,
]);

// Tokenize: (startIndex, inputString)
tokenizer.tokenize(0, subject);
// ['number', '12345', 5]

tokenizer.tokenize(5, subject);
// ['sequence', 'abc', 8]

tokenizer.tokenize(8, subject);
// ['number', '67890', 13]

tokenizer.tokenize(13, subject);
// ['$', '', 14]  -- end token

tokenizer.tokenize(14, subject);
// null
```

The `tokenize()` method returns a tuple of
`[tokenName, matchedValue, endIndex]`, the end
token `$` when the string is consumed, or `null`
when past the end.

### Exporting and importing state machines

You can serialize the compiled state machine to
JSON for reuse without recompiling:

```ts
// Export
const json = tokenizer.toJSON();
const obj = tokenizer.toObject();

// Import into a fresh tokenizer
const loaded = new Tokenizer();
loaded.fromJSON(json);
// or
loaded.fromJSON(obj);
```

## Supported Regex Operators

| Operator | Syntax | Description |
|----------|--------|-------------|
| Alternation | `a\|b` | Match either branch |
| Optional | `a?` | Zero or one |
| Repeat | `a+` | One or more |
| Kleene star | `a*` | Zero or more |
| Character class | `[abc]` | Match any listed character |
| Negated class | `[^abc]` | Match any unlisted character |
| Ranges | `[0-9a-z]` | Character ranges in classes |
| Grouping | `(ab)` | Group subexpressions |

## API

| Method | Description |
|--------|-------------|
| `define(definitions)` | Register token name-pattern pairs |
| `tokenize(from, str)` | Extract the next token from index |
| `toJSON()` | Export state machine as JSON string |
| `toObject()` | Export state machine as plain object |
| `fromJSON(data)` | Import from JSON string or object |

## [Release Notes](docs/release-notes.md)

## License

[ISC](./LICENSE)
