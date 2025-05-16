#!/usr/bin/env node
import { parseArgs, hasFlag, getOptionValue } from './args.js';
import { getCommandHelp } from './help.js';
import { handleCommand } from './commands.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = parseArgs(process.argv);

  // Handle help flag
  if (hasFlag(args.options, ['h', 'help'])) {
    console.log(getCommandHelp(args.command));
    process.exit(0);
  }

  // No command specified
  if (!args.command) {
    console.log(getCommandHelp());
    process.exit(0);
  }

  try {
    const result = await handleCommand(args);
    console.log(result.message);
    process.exit(result.code);
  } catch (error) {
    console.error('Unexpected error:', (error as Error).message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
