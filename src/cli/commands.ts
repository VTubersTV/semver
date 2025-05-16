import SemVer from '../index.js';
import type { ParsedArgs } from './args.js';

export interface CommandResult {
  success: boolean;
  message: string;
  code: number;
}

export async function handleCommand(args: ParsedArgs): Promise<CommandResult> {
  switch (args.command) {
    case 'validate':
      return handleValidate(args);
    case 'compare':
      return handleCompare(args);
    case 'increment':
      return handleIncrement(args);
    default:
      return {
        success: false,
        message: `Unknown command: ${args.command}`,
        code: 1
      };
  }
}

function handleValidate(args: ParsedArgs): CommandResult {
  const version = args.positionals[0];
  if (!version) {
    return {
      success: false,
      message: 'Version argument is required',
      code: 1
    };
  }

  try {
    // Try parsing as internal version first
    if (SemVer.isValid(version)) {
      return {
        success: true,
        message: `✓ Valid semantic version: ${version}`,
        code: 0
      };
    }

    // Try parsing as public version
    if (SemVer.isValidPublicVersion(version)) {
      return {
        success: true,
        message: `✓ Valid public version: ${version}`,
        code: 0
      };
    }

    return {
      success: false,
      message: `✗ Invalid version: ${version}`,
      code: 1
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${(error as Error).message}`,
      code: 1
    };
  }
}

function handleCompare(args: ParsedArgs): CommandResult {
  const [v1, v2] = args.positionals;
  
  if (!v1 || !v2) {
    return {
      success: false,
      message: 'Two version arguments are required',
      code: 1
    };
  }

  try {
    const result = SemVer.compare(v1, v2);
    let message: string;

    if (result > 0) {
      message = `${v1} > ${v2}`;
    } else if (result < 0) {
      message = `${v1} < ${v2}`;
    } else {
      message = `${v1} = ${v2}`;
    }

    return {
      success: true,
      message,
      code: 0
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${(error as Error).message}`,
      code: 1
    };
  }
}

function handleIncrement(args: ParsedArgs): CommandResult {
  const [version, type] = args.positionals;
  
  if (!version || !type) {
    return {
      success: false,
      message: 'Version and increment type (major|minor|patch) are required',
      code: 1
    };
  }

  if (!['major', 'minor', 'patch'].includes(type)) {
    return {
      success: false,
      message: 'Increment type must be one of: major, minor, patch',
      code: 1
    };
  }

  try {
    const prerelease = typeof args.options.pre === 'string' ? args.options.pre : undefined;
    const buildMetadata = typeof args.options.build === 'string' ? args.options.build : undefined;

    const newVersion = SemVer.increment(
      version,
      type as 'major' | 'minor' | 'patch',
      prerelease,
      buildMetadata
    );

    return {
      success: true,
      message: newVersion,
      code: 0
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${(error as Error).message}`,
      code: 1
    };
  }
} 