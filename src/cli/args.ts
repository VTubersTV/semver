/**
 * Command line argument parser
 * No external dependencies required
 */

export interface ParsedArgs {
  command: string;
  options: Record<string, string | boolean>;
  positionals: string[];
}

export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    command: '',
    options: {},
    positionals: []
  };

  // Skip first two args (node and script path)
  const cliArgs = args.slice(2);
  
  if (cliArgs.length > 0) {
    result.command = cliArgs[0];
  }

  for (let i = 1; i < cliArgs.length; i++) {
    const arg = cliArgs[i];

    if (arg.startsWith('--')) {
      // Handle --key=value or --key
      const parts = arg.slice(2).split('=');
      result.options[parts[0]] = parts[1] || true;
    } else if (arg.startsWith('-')) {
      // Handle -k value or -k
      const key = arg.slice(1);
      const nextArg = cliArgs[i + 1];
      if (nextArg && !nextArg.startsWith('-')) {
        result.options[key] = nextArg;
        i++; // Skip next arg since we used it as value
      } else {
        result.options[key] = true;
      }
    } else {
      // Handle positional arguments
      result.positionals.push(arg);
    }
  }

  return result;
}

export function getOptionValue(
  options: Record<string, string | boolean>,
  keys: string[],
  defaultValue?: string
): string | undefined {
  for (const key of keys) {
    const value = options[key];
    if (typeof value === 'string') return value;
  }
  return defaultValue;
}

export function hasFlag(
  options: Record<string, string | boolean>,
  keys: string[]
): boolean {
  return keys.some(key => options[key] === true);
} 