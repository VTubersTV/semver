# Getting Started with @vtubers.tv/semver

This guide will help you get started with using the VTubers.TV Semantic Versioning package in your projects.

## Installation

Install the package directly from our GitHub repository:

```bash
npm install git://github.com/vtuberstv/semver.git
# or
yarn add git://github.com/vtuberstv/semver.git
# or
pnpm add git://github.com/vtuberstv/semver.git
```

## Basic Usage

Import the package in your TypeScript/JavaScript code:

```typescript
import SemVer from '@vtubers.tv/semver';
```

### Parsing Versions

```typescript
// Parse a standard SemVer string
const version = SemVer.parse('1.2.3-beta.1+build.123');
console.log(version);
// Output:
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['beta', '1'],
//   buildMetadata: 'build.123'
// }

// Parse a VTubers.TV public version
const publicVersion = SemVer.parsePublicVersion('Aurora-1.0-beta');
console.log(publicVersion);
// Output:
// {
//   theme: 'Aurora',
//   version: '1.0',
//   status: 'beta'
// }
```

### Version Validation

```typescript
// Validate a standard SemVer string
console.log(SemVer.isValid('1.2.3')); // true
console.log(SemVer.isValid('1.2')); // false

// Validate a public version string
console.log(SemVer.isValidPublicVersion('Aurora-1.0')); // true
console.log(SemVer.isValidPublicVersion('Invalid-1.0')); // false
```

### Version Comparison

```typescript
// Compare two versions
console.log(SemVer.compare('1.2.0', '1.1.9')); // 1 (first is greater)
console.log(SemVer.compare('1.1.0', '1.1.0')); // 0 (equal)
console.log(SemVer.compare('1.0.0-alpha', '1.0.0')); // -1 (first is less)
```

### Version Increment

```typescript
// Increment version numbers
console.log(SemVer.increment('1.2.3', 'minor')); // '1.3.0'
console.log(SemVer.increment('1.2.3', 'major', 'alpha')); // '2.0.0-alpha'
console.log(SemVer.increment('1.2.3', 'patch')); // '1.2.4'
```

### Version Mapping

```typescript
// Create a version mapping
const mapping = SemVer.createVersionMapping(
  '1.2.3',
  'Aurora-1.0',
  '2024-03-20'
);

// Get version data
const versionData = SemVer.getVersionData('Aurora-1.0');
const latestStable = SemVer.getLatestStableVersion();
```

## Configuration

The package works out of the box with sensible defaults. However, you can extend the approved themes list for public versions:

```typescript
// Add your custom themes
SemVer.approvedThemes.push('Celestial', 'Ocean');
```

## Next Steps

- Learn more about [Version Parsing](./version-parsing.md)
- Explore [Public Versions](./public-versions.md)
- Understand [Version Comparison](./version-comparison.md)
- See the complete [API Reference](./api-reference.md)

## Common Issues

1. **Invalid Version String**
   ```typescript
   try {
     SemVer.parse('invalid');
   } catch (error) {
     console.error('Invalid version string');
   }
   ```

2. **Invalid Theme**
   ```typescript
   try {
     SemVer.parsePublicVersion('InvalidTheme-1.0');
   } catch (error) {
     console.error('Invalid theme name');
   }
   ```

## Best Practices

1. Always validate version strings before parsing
2. Use try-catch blocks when parsing versions
3. Compare versions using the `compare` method instead of string comparison
4. Use the increment method instead of manual version manipulation
5. Keep track of version mappings for better version management

## Need Help?

If you encounter any issues or have questions:

1. Check the [documentation](./README.md)
2. Search existing [issues](https://github.com/VtubersTV/semver/issues)
3. Create a new issue if needed 