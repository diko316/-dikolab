# LALR Parser

[![npm version](https://img.shields.io/npm/v/@dikolab/lalr-parser)](https://www.npmjs.com/package/@dikolab/lalr-parser)
[![license](https://img.shields.io/npm/l/@dikolab/lalr-parser)](./LICENSE)

LALR(1) parser with pushdown automaton for
shift-reduce parsing and parse tree construction.

Migrated from [`libcore-parser-lalr`](https://github.com/nicoseta/libcore-parser-lalr)
with full TypeScript support. Uses
[`@dikolab/tokenizer`](https://www.npmjs.com/package/@dikolab/tokenizer)
for lexing.

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
npm install @dikolab/lalr-parser
```

## Usage

### Defining a grammar

Grammar definitions use an alternating array of
rule names and their productions. Terminal tokens
are defined with `RegExp` patterns. Nonterminal
rules start with an uppercase letter.

```ts
import { define } from '@dikolab/lalr-parser';

const parser = define(
   'Expr', // Root production
   [
      // Lexical terminals
      '+',        [/\+/],
      '*',        [/\*/],
      '(',        [/\(/],
      ')',        [/\)/],
      'number',   [/(\+|\-)?[0-9]+(\.[0-9]+)?/],

      // Grammar rules
      'Expr',     ['Add'],
      'Add',      [
                     'Mul',
                     ['Add', '+', 'Mul'],
                  ],
      'Mul',      [
                     'Unit',
                     ['Mul', '*', 'Unit'],
                  ],
      'Unit',     [
                     'number',
                     ['(', 'Expr', ')'],
                  ],
   ],
   // Tokens to ignore (whitespace)
   [/[ \r\n\t]+/],
);
```

### Parsing with an iterator

The iterator walks through the parse producing
lexemes for each shift and reduce action:

```ts
const iterator = parser.iterator();

// Set the input string
iterator.set('1 + 2 * 3');

// Iterate through lexemes
for (
   let lexeme = iterator.next();
   lexeme;
   lexeme = iterator.next()
) {
   console.log(
      lexeme.name,         // rule name
      lexeme.rule,         // rule id
      lexeme.value,        // lexeme value
      lexeme.reduceCount,  // reduce params
   );
}
```

### Using the parse() method

For simpler cases, `parse()` handles the
iteration and optionally applies reducer
callbacks:

```ts
const result = parser.parse(
   '1 + 2 * 3',
   {
      // Called when 'Add' rule reduces
      Add(name, value, lexeme) {
         const [left, , right] = value;
         return left + right;
      },
      Mul(name, value, lexeme) {
         const [left, , right] = value;
         return left * right;
      },
      number(name, value) {
         return parseFloat(value);
      },
   },
);

// result is Lexeme[] or false on error
```

### Exporting and importing

Parser state can be serialized to JSON for
reuse without recompiling the grammar:

```ts
// Export
const json = parser.toJSON();
const obj = parser.toObject();

// Import into a new parser
import { load } from '@dikolab/lalr-parser';

const loaded = load(json);
// or
const loaded2 = load(obj);
```

### Checking parser instances

```ts
import { isParser } from '@dikolab/lalr-parser';

isParser(parser);  // true
isParser({});      // false
```

### Custom iterators

You can extend `BaseIterator` and register
custom iterator implementations:

```ts
import {
   Iterator,
   registerIterator,
} from '@dikolab/lalr-parser';

class MyIterator extends Iterator {
   // Override handlers as needed
}

registerIterator('custom', MyIterator);

// Use the custom iterator
const iter = parser.iterator('custom');
```

## Lexeme Properties

Each lexeme in the parse tree exposes:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Grammar rule or token name |
| `rule` | `string` | Rule identifier (e.g. `'1:Add'`) |
| `value` | `unknown` | Matched string or reduced values |
| `type` | `number` | 1=terminal, 2=nonterminal, 4=end |
| `terminal` | `boolean` | Whether this is a terminal |
| `from` | `number` | Start index in input |
| `to` | `number` | End index in input |
| `reduceCount` | `number` | Number of reduced children |
| `parent` | `Lexeme` | Parent node |
| `first` / `last` | `Lexeme` | First/last child |
| `next` / `previous` | `Lexeme` | Sibling links |

## API

| Export | Description |
|--------|-------------|
| `define(root, definitions, exclusions?)` | Create a parser from grammar rules |
| `load(json)` | Load a parser from exported JSON |
| `isParser(value)` | Check if value is a Parser |
| `debug(enable?)` | Toggle debug mode for new parsers |
| `Parser` | Parser class |
| `BaseIterator` / `Iterator` | Base iterator class |
| `Lexeme` | Parse tree node class |
| `registerIterator(name, Class)` | Register a custom iterator |

## Supported Regex Operators

Terminal token patterns support the same regex
operators as
[`@dikolab/tokenizer`](https://www.npmjs.com/package/@dikolab/tokenizer):
alternation `|`, optional `?`, repeat `+`,
Kleene star `*`, character classes `[]` `[^]`,
and grouping `()`.

## License

[ISC](./LICENSE)
