# Version Parsing

This document details how version strings are parsed in the @vtubers.tv/semver package.

## SemVer 2.0.0 Specification

The package implements the full [SemVer 2.0.0 specification](https://semver.org/spec/v2.0.0.html) with additional VTubers.TV extensions.

### Version Format

A valid semantic version has the following format:

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

Where:
- `MAJOR`: Incompatible API changes
- `MINOR`: Backward-compatible functionality
- `PATCH`: Backward-compatible bug fixes
- `PRERELEASE`: Pre-release version identifiers
- `BUILD`: Build metadata

### Regular Expression

The package uses the following regular expression to validate and parse versions:

```typescript
/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
```

This regex ensures:
1. Major, minor, and patch versions are non-negative integers
2. No leading zeros (except zero itself)
3. Pre-release version is dot-separated identifiers
4. Build metadata is dot-separated alphanumeric identifiers

## Parsing Examples

### Basic Version

```typescript
const version = SemVer.parse('1.2.3');
// {
//   major: 1,
//   minor: 2,
//   patch: 3
// }
```

### Version with Pre-release

```typescript
const version = SemVer.parse('1.2.3-beta.1');
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['beta', '1']
// }
```

### Version with Build Metadata

```typescript
const version = SemVer.parse('1.2.3+build.123');
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   buildMetadata: 'build.123'
// }
```

### Complete Version

```typescript
const version = SemVer.parse('1.2.3-beta.1+build.123');
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['beta', '1'],
//   buildMetadata: 'build.123'
// }
```

## Validation Rules

### Major, Minor, Patch

- Must be non-negative integers
- No leading zeros
- Required fields

```typescript
SemVer.isValid('1.2.3');     // true
SemVer.isValid('01.2.3');    // false (leading zero)
SemVer.isValid('1.2');       // false (missing patch)
SemVer.isValid('-1.2.3');    // false (negative)
```

### Pre-release Version

- Optional
- Dot-separated identifiers
- Each identifier must be:
  - Numeric (no leading zeros)
  - Alphanumeric with hyphens

```typescript
SemVer.isValid('1.2.3-beta');      // true
SemVer.isValid('1.2.3-beta.1');    // true
SemVer.isValid('1.2.3-beta.01');   // false (leading zero)
SemVer.isValid('1.2.3-beta..1');   // false (empty identifier)
```

### Build Metadata

- Optional
- Dot-separated alphanumeric identifiers
- Can contain hyphens
- Leading zeros allowed

```typescript
SemVer.isValid('1.2.3+build');         // true
SemVer.isValid('1.2.3+build.123');     // true
SemVer.isValid('1.2.3+build.01');      // true (leading zeros allowed)
SemVer.isValid('1.2.3+build..123');    // false (empty identifier)
```

## Error Handling

The parser throws descriptive errors for invalid versions:

```typescript
try {
  SemVer.parse('invalid');
} catch (error) {
  console.error('Invalid version string');
}

try {
  SemVer.parse('1.2');
} catch (error) {
  console.error('Missing patch version');
}

try {
  SemVer.parse('1.2.3-');
} catch (error) {
  console.error('Empty pre-release identifier');
}
```

## Best Practices

1. **Always Validate First**
   ```typescript
   if (SemVer.isValid(version)) {
     const parsed = SemVer.parse(version);
     // Use parsed version
   }
   ```

2. **Handle Pre-release Versions**
   ```typescript
   const version = SemVer.parse('1.2.3-beta.1');
   if (version.prerelease) {
     // Handle pre-release version
   }
   ```

3. **Ignore Build Metadata for Comparison**
   ```typescript
   // These versions are considered equal
   SemVer.compare('1.2.3+build.1', '1.2.3+build.2') === 0
   ```

4. **Use Increment for Version Changes**
   ```typescript
   // Instead of manual manipulation
   const newVersion = SemVer.increment('1.2.3', 'minor');
   ```

## See Also

- [Public Versions](./public-versions.md) - VTubers.TV public version format
- [Version Comparison](./version-comparison.md) - Version comparison rules
- [API Reference](./api-reference.md) - Complete API documentation 