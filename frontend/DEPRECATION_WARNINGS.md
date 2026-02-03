# Dependency Deprecation Warnings

## Overview

When running `npm install` for the frontend, you may see deprecation warnings from various packages. These warnings come from transitive dependencies of `react-scripts 5.0.1` (the latest stable version of Create React App).

## What We've Fixed

✅ **All Security Vulnerabilities Resolved**
- Fixed `nth-check` vulnerability (high severity)
- Fixed `postcss` vulnerability (moderate severity)
- Fixed `webpack-dev-server` vulnerability (moderate severity)

Using npm `overrides` in `package.json`, we've forced newer versions of these packages to address security issues while maintaining compatibility with `react-scripts`.

## Remaining Deprecation Warnings

The following deprecation warnings remain but do NOT affect functionality or security:

### Deep Transitive Dependencies

1. **`rollup-plugin-terser@7.0.2`** → Use `@rollup/plugin-terser`
2. **`sourcemap-codec@1.4.8`** → Use `@jridgewell/sourcemap-codec`
3. **`stable@0.1.8`** → No longer needed (Array#sort is stable in modern JS)
4. **`q@1.5.1`** → Deprecated promise library
5. **`whatwg-encoding@1.0.5`** → Use `@exodus/bytes`
6. **`abab@2.0.6`** → Use native `atob()` and `btoa()`
7. **`domexception@2.0.1`** → Use native `DOMException`
8. **`w3c-hr-time@1.0.2`** → Use native `performance.now()`
9. **`inflight@1.0.6`** → Memory leak (used by `glob@7.2.3`)
10. **`glob@7.2.3`** → Versions prior to v9 deprecated
11. **`rimraf@3.0.2`** → Versions prior to v4 deprecated
12. **`svgo@1.3.2`** → No longer supported (upgrade to v2+)
13. **`eslint@8.57.1`** → No longer supported (upgrade to v9+)

### Babel Plugins

These `@babel/plugin-proposal-*` packages have been merged into the ECMAScript standard:

- `@babel/plugin-proposal-optional-chaining` → Use `@babel/plugin-transform-optional-chaining`
- `@babel/plugin-proposal-class-properties` → Use `@babel/plugin-transform-class-properties`
- `@babel/plugin-proposal-nullish-coalescing-operator` → Use `@babel/plugin-transform-nullish-coalescing-operator`
- `@babel/plugin-proposal-numeric-separator` → Use `@babel/plugin-transform-numeric-separator`
- `@babel/plugin-proposal-private-methods` → Use `@babel/plugin-transform-private-methods`
- `@babel/plugin-proposal-private-property-in-object` → Use `@babel/plugin-transform-private-property-in-object`

### ESLint Packages

- `@humanwhocodes/object-schema@2.0.3` → Use `@eslint/object-schema`
- `@humanwhocodes/config-array@0.13.0` → Use `@eslint/config-array`

### Workbox Packages

- `workbox-cacheable-response@6.6.0` → Deprecated
- `workbox-google-analytics@6.6.0` → Not compatible with GA v4+

## Why Can't We Fix These?

These packages are **deep transitive dependencies** of `react-scripts`. We cannot directly control them without:

1. **Ejecting from Create React App** - This would mean maintaining all build configuration ourselves
2. **Migrating to a different framework** - Options include Vite, Next.js, or Remix
3. **Waiting for `react-scripts` update** - The Create React App team is working on updates

## Should You Be Concerned?

**No.** These deprecation warnings:
- ✅ Do not prevent the build from succeeding
- ✅ Do not affect runtime behavior
- ✅ Do not introduce security vulnerabilities (we've fixed those)
- ⚠️ Are informational only - indicating the package authors recommend alternatives

## Status of Create React App

Create React App (`react-scripts`) is in **maintenance mode**. The React team now recommends:

- **[Vite](https://vitejs.dev/)** - Fast, modern build tool
- **[Next.js](https://nextjs.org/)** - Full-featured React framework
- **[Remix](https://remix.run/)** - Full-stack React framework

A future enhancement could be migrating to one of these tools, but that's beyond the scope of addressing deprecation warnings.

## What's in Our Package.json

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.6.0"
  },
  "overrides": {
    "nth-check": "^2.1.1",        // Fixes high severity vulnerability (inefficient regex)
    "postcss": "^8.4.31",          // Fixes moderate severity vulnerability (line return parsing)
    "webpack-dev-server": "^5.2.1" // Fixes moderate severity vulnerabilities (source code theft)
  }
}
```

**Why these specific overrides?**
- **nth-check**: Forces version 2.1.1+ to fix CVE with inefficient regular expression complexity
- **postcss**: Forces version 8.4.31+ to fix line return parsing error  
- **webpack-dev-server**: Forces version 5.2.1+ to fix source code theft vulnerabilities

The `overrides` section forces npm to use newer, secure versions of these packages even though `react-scripts` doesn't explicitly require them.

## References

- [Create React App Status](https://github.com/facebook/create-react-app/issues/11180)
- [React Documentation - Start a New React Project](https://react.dev/learn/start-a-new-react-project)
- [npm overrides documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides)

---

**Last Updated:** January 19, 2024  
**Status:** Security vulnerabilities fixed, deprecation warnings are informational only
