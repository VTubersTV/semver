# Command Line Interface (CLI) Guide

The @vtubers.tv/semver package includes a command-line interface for common version management tasks. This guide covers all available commands and their usage.

## Installation

To use the CLI, install the package globally:

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

After installation, the `semver` command will be available in your terminal.

## Commands Overview

The CLI provides the following commands:

- `validate` - Validate version strings
- `compare` - Compare two versions
- `increment` - Increment version numbers

### Global Options

- `-h, --help` - Show help information
  - Use without a command to see general help
  - Use with a command to see command-specific help

## Command Details

### Validate Command

Validates both semantic versions and VTubers.TV public versions.

```bash
semver validate <version>
```

Examples:
```bash
# Validate a semantic version
semver validate 1.0.0
semver validate 2.1.0-beta.1+build.123

# Validate a public version
semver validate Aurora-1.0
semver validate Aurora-1.0-beta
```

Output:
- Success: "✓ Valid semantic version: 1.0.0"
- Success: "✓ Valid public version: Aurora-1.0"
- Error: "✗ Invalid version: invalid-version"

### Compare Command

Compares two version strings and shows their relationship.

```bash
semver compare <version1> <version2>
```

Examples:
```bash
# Compare semantic versions
semver compare 1.0.0 2.0.0
semver compare 1.0.0-alpha 1.0.0-beta

# Compare with pre-release versions
semver compare 1.0.0 1.0.0-beta
semver compare 1.0.0-alpha.1 1.0.0-alpha.2
```

Output:
- "1.0.0 < 2.0.0"
- "1.0.0-alpha < 1.0.0-beta"
- "1.0.0 > 1.0.0-beta"

### Increment Command

Increments a version number according to semantic versioning rules.

```bash
semver increment <version> (major|minor|patch) [--pre=alpha] [--build=001]
```

Options:
- `--pre=<prerelease>` - Add a pre-release identifier
- `--build=<build>` - Add build metadata

Examples:
```bash
# Basic increments
semver increment 1.0.0 major    # 2.0.0
semver increment 1.0.0 minor    # 1.1.0
semver increment 1.0.0 patch    # 1.0.1

# With pre-release and build metadata
semver increment 1.0.0 minor --pre=beta              # 1.1.0-beta
semver increment 1.0.0 major --pre=alpha --build=001 # 2.0.0-alpha+001
```

## Error Handling

The CLI provides clear error messages for common issues:

```bash
# Missing version argument
semver validate
> Error: Version argument is required

# Invalid increment type
semver increment 1.0.0 invalid
> Error: Increment type must be one of: major, minor, patch

# Invalid version format
semver validate 1.0
> Error: Invalid version string
```

## Exit Codes

The CLI uses standard exit codes:
- `0` - Success
- `1` - Error (invalid input, parsing error, etc.)

## Best Practices

1. **Version Validation**
   - Always validate versions before using them in your workflow
   - Use the validate command to check both semantic and public versions

2. **Version Comparison**
   - Use the compare command instead of string comparison
   - Remember that pre-release versions are lower than regular versions

3. **Version Increments**
   - Use the increment command to ensure correct version bumping
   - Add pre-release identifiers for development versions
   - Use build metadata for additional version information

4. **Scripting**
   - The CLI is designed to be script-friendly with consistent exit codes
   - Use the machine-readable output for automated workflows

## See Also

- [Version Parsing](./version-parsing.md) - Understanding version formats
- [Public Versions](./public-versions.md) - VTubers.TV public version system
- [API Reference](./api-reference.md) - Programmatic interface 