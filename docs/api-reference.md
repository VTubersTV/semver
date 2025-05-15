# API Reference

Complete API documentation for the @vtubers.tv/semver package.

## Core Types

### Version Interface

```typescript
interface Version {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string[];
  buildMetadata?: string;
}
```

### PublicVersion Interface

```typescript
interface PublicVersion {
  theme: string;
  version: string;
  status?: string;
}
```

### VersionMapping Interface

```typescript
interface VersionMapping {
  internalVersion: string;
  publicVersion: string;
  releaseDate: string;
  theme: string;
  status: string;
}
```

## Core Functions

### parse(version: string): Version

Parses a semantic version string into its components.

```typescript
const version = SemVer.parse('1.2.3-beta.1+build.123');
// Returns:
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['beta', '1'],
//   buildMetadata: 'build.123'
// }
```

Throws an error if the version string is invalid.

### parsePublicVersion(version: string): PublicVersion

Parses a VTubers.TV public version string.

```typescript
const publicVer = SemVer.parsePublicVersion('Aurora-1.0-beta');
// Returns:
// {
//   theme: 'Aurora',
//   version: '1.0',
//   status: 'beta'
// }
```

Throws an error if the version string is invalid or the theme is not approved.

### isValid(version: string): boolean

Validates a semantic version string.

```typescript
SemVer.isValid('1.2.3'); // true
SemVer.isValid('1.2'); // false
```

### isValidPublicVersion(version: string): boolean

Validates a public version string.

```typescript
SemVer.isValidPublicVersion('Aurora-1.0'); // true
SemVer.isValidPublicVersion('Invalid-1.0'); // false
```

### compare(v1: string, v2: string): number

Compares two version strings.

```typescript
SemVer.compare('1.2.0', '1.1.9'); // 1 (v1 > v2)
SemVer.compare('1.1.0', '1.1.0'); // 0 (v1 = v2)
SemVer.compare('1.0.0-alpha', '1.0.0'); // -1 (v1 < v2)
```

Returns:
- `1` if v1 > v2
- `0` if v1 = v2
- `-1` if v1 < v2

### increment(version: string, type: 'major' | 'minor' | 'patch', prerelease?: string, buildMetadata?: string): string

Increments a version number.

```typescript
SemVer.increment('1.2.3', 'minor'); // '1.3.0'
SemVer.increment('1.2.3', 'major', 'alpha'); // '2.0.0-alpha'
SemVer.increment('1.2.3', 'patch', undefined, 'build.123'); // '1.2.4+build.123'
```

## Version Mapping Functions

### createVersionMapping(internalVersion: string, publicVersion: string, releaseDate: string): VersionMapping

Creates a mapping between internal and public versions.

```typescript
const mapping = SemVer.createVersionMapping(
  '1.2.3',
  'Aurora-1.0',
  '2024-03-20'
);
```

### getVersionData(publicVersion: string): PublicVersionData | undefined

Retrieves version data for a public version.

```typescript
const data = SemVer.getVersionData('Aurora-1.0');
```

### getLatestStableVersion(): PublicVersionData | undefined

Gets the latest stable version.

```typescript
const latest = SemVer.getLatestStableVersion();
```

## Static Properties

### approvedThemes: string[]

List of approved themes for public versions.

```typescript
console.log(SemVer.approvedThemes); // ['Aurora', 'Nebula']
SemVer.approvedThemes.push('Celestial'); // Add a new theme
```

## Error Types

The package may throw the following types of errors:

1. **Invalid Version Error**
   ```typescript
   try {
     SemVer.parse('invalid');
   } catch (error) {
     // Handle invalid version
   }
   ```

2. **Invalid Theme Error**
   ```typescript
   try {
     SemVer.parsePublicVersion('InvalidTheme-1.0');
   } catch (error) {
     // Handle invalid theme
   }
   ```

## Type Guards

### isVersion(obj: any): obj is Version

Type guard for Version interface.

### isPublicVersion(obj: any): obj is PublicVersion

Type guard for PublicVersion interface.

## Best Practices

1. Always validate input before parsing
2. Use type guards when working with version objects
3. Handle errors appropriately
4. Use the compare function instead of string comparison
5. Use the increment function instead of manual version manipulation

## See Also

- [Version Parsing](./version-parsing.md)
- [Public Versions](./public-versions.md)
- [Version Comparison](./version-comparison.md)
- [Version Mapping](./version-mapping.md) 