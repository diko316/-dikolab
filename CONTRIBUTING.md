# Contributing

Thank you for your interest in contributing to
@dikolab packages.

## Getting started

1. Fork the repository and clone it locally.
2. Install dependencies from the workspace root:
   ```bash
   npm install
   ```
3. Create a branch following the naming convention:
   ```
   <package-name>/<type>/<description>
   ```
   Types: `feature`, `fix`, `refactor`, `chore`

## Development

- All packages use ESM (`"type": "module"`) and
  TypeScript targeting ES2022.
- Code style: 3-space indentation, single quotes,
  always semicolons, LF line endings, 72-char max
  line length.
- ESLint and Prettier enforce formatting
  (`prettier/prettier: error`).

### Build

```bash
npm run build -w packages/<package-name>
```

### Test

```bash
npm test -w packages/<package-name>
```

### Lint

```bash
npm run lint -w packages/<package-name>
```

## Submitting changes

1. Ensure lint, tests, and build all pass.
2. Write clear commit messages describing the change.
3. Open a pull request targeting `main`.
4. Describe what changed and why in the PR body.

## Reporting issues

Open an issue at
https://github.com/diko316/-dikolab/issues with a
clear description of the problem, steps to reproduce,
and expected behavior.
