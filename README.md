# @vtubers.tv/semver

Official Semantic Versioning Parser and Validator for VTubers.TV services. This package provides a robust implementation of SemVer 2.0.0 with VTubers.TV-specific extensions for version management.

## Features

- 🎯 Full SemVer 2.0.0 specification compliance
- 🔧 Custom theme-based versioning system
- 🛡️ Strict version validation
- 📦 Zero dependencies
- 📚 Well-documented API
- ✨ Public version mapping support
- 🔄 Version comparison and increment utilities
- 🖥️ Command-line interface (CLI)

## Installation

Since this is an internal package, install it directly from the GitHub repository:

```bash
# Using npm
# Install globally to use the CLI
npm install -g git://github.com/vtuberstv/semver.git
# or locally as a dependency
npm install git://github.com/vtuberstv/semver.git

# Using Yarn
# Install globally to use the CLI
yarn global add git://github.com/vtuberstv/semver.git
# or locally as a dependency
yarn add git://github.com/vtuberstv/semver.git

# Using pnpm
# Install globally to use the CLI
pnpm add -g git://github.com/vtuberstv/semver.git
# or locally as a dependency
pnpm add git://github.com/vtuberstv/semver.git
```

## Quick Start

### Using as a Library

```typescript
import SemVer from '@vtubers.tv/semver'

// Parse and validate versions
const version = SemVer.parse('1.2.3-beta.1+build.123')
console.log(version)
// {
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['beta', '1'],
//   buildMetadata: 'build.123'
// }

// Parse public versions
const publicVer = SemVer.parsePublicVersion('Aurora-1.0-beta')
console.log(publicVer)
// {
//   theme: 'Aurora',
//   version: '1.0',
//   status: 'beta'
// }

// Compare versions
console.log(SemVer.compare('1.2.0', '1.1.9')) // 1
console.log(SemVer.compare('1.1.0', '1.1.0')) // 0
console.log(SemVer.compare('1.0.0-alpha', '1.0.0')) // -1

// Increment versions
console.log(SemVer.increment('1.2.3', 'minor')) // '1.3.0'
console.log(SemVer.increment('1.2.3', 'major', 'alpha')) // '2.0.0-alpha'
```

### Using the CLI

The package includes a command-line interface for common version management tasks:

```bash
# Validate versions (both semantic and public)
semver validate 1.0.0
semver validate Aurora-1.0-beta

# Compare two versions
semver compare 1.0.0 2.0.0
semver compare 1.0.0-alpha 1.0.0-beta

# Increment versions
semver increment 1.0.0 major
semver increment 1.0.0 minor --pre=beta
semver increment 1.0.0 patch --build=20240301

# Show help
semver --help
semver <command> --help
```

Available Commands:
- `validate <version>` - Validate a semantic or public version string
- `compare <version1> <version2>` - Compare two version strings
- `increment <version> (major|minor|patch) [--pre=alpha] [--build=001]` - Increment a version number

## Documentation

The package includes comprehensive documentation for all features:

- [Getting Started](./docs/getting-started.md) - Basic usage and concepts
- [Version Parsing](./docs/version-parsing.md) - Detailed parsing rules
- [Public Versions](./docs/public-versions.md) - Theme-based versioning system
- [Version Comparison](./docs/version-comparison.md) - Comparison rules and examples
- [Version Mapping](./docs/version-mapping.md) - Internal to public version mapping
- [API Reference](./docs/api-reference.md) - Complete API documentation
- [CLI Guide](./docs/cli-guide.md) - Command-line interface documentation

See the [full documentation](./docs/README.md) for detailed examples and usage guidelines.

## API Overview

### Core Functions
- `parse(version: string): Version` - Parse a SemVer string
- `parsePublicVersion(version: string): PublicVersion` - Parse a public version string
- `isValid(version: string): boolean` - Validate a SemVer string
- `isValidPublicVersion(version: string): boolean` - Validate a public version string
- `compare(v1: string, v2: string): number` - Compare two versions
- `increment(version: string, type: 'major' | 'minor' | 'patch'): string` - Increment a version

### Version Mapping
- `createVersionMapping(internal: string, public: string, date: string): VersionMapping`
- `getVersionData(publicVersion: string): PublicVersionData`
- `getLatestStableVersion(): PublicVersionData`

## Requirements

- TypeScript >= 4.5
- Node.js >= 16.0.0

## Contributing

1. Fork the repository
2. Create your feature branch
3. Add your changes and tests
4. Update documentation
5. Submit a pull request

## License

This project is licensed under the AGPL-3.0 License and the VTubers.TV Commercial License (VCL) v1.0. See the [LICENSE](./LICENSE) and [LICENSE-VCL](./LICENSE-VCL.md) file for details.

## Support

For support, please open an issue in the [GitHub repository](https://github.com/VtubersTV/semver/issues).
