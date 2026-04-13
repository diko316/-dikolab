# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

NPM workspace monorepo (`@dikolab/*`) containing published and in-development packages. All packages use ESM (`"type": "module"`), TypeScript, and target ES2022.

Published packages: `@dikolab/private-parts`, `@dikolab/tales`

## Commands

### Build all packages
```
npm run build --workspaces
```

### Build a single package
```
npm run build -w packages/<package-name>
```

### Run tests (vitest, single run)
```
npm test -w packages/<package-name>
```

### Run a single test file
```
npx vitest --run <path-to-test-file>
```

### Lint
```
npm run lint -w packages/<package-name>
```

### Publish preparation (lint + test + build)
Each package runs `prepublishOnly`: `npm run lint && npm run test && npm run build`

## Architecture

### Build pipeline
- **Rollup** builds each package from `src/index.ts` into `lib/` with dual output: CJS (`.js`) and ESM (`.mjs`) with sourcemaps and declarations.
- The root `rollup.config.js` is the shared config; packages re-export it (`export { default } from '../../rollup.config.js'`).
- `tsconfig.build.json` extends `tsconfig.json` and excludes test files from build output.

### Shared configuration pattern
- ESLint config: root `eslint.config.mts` is re-exported by each package's `eslint.config.mts`.
- Rollup config: root `rollup.config.js` is re-exported by each package's `rollup.config.js`.
- TypeScript: root `tsconfig.json` is extended by each package's `tsconfig.json`.

### Test convention
- Tests use **vitest** and live alongside source files as `*.test.ts` (not `.spec.ts`).

### Package dependencies
- `@dikolab/tales` depends on `@dikolab/private-parts`.

### Output structure
- Source code lives in `src/`, build output goes to `lib/`.
- Only `lib/**/*` is published to npm (configured via `"files"` in each package.json).
