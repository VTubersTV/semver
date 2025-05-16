/**
 * Help text and documentation generator
 */

export interface CommandHelp {
  command: string;
  description: string;
  usage: string;
  examples: string[];
}

const commands: CommandHelp[] = [
  {
    command: 'validate',
    description: 'Validate a semantic version string',
    usage: 'semver validate <version>',
    examples: [
      'semver validate 1.0.0',
      'semver validate 2.1.0-beta.1',
      'semver validate Aurora-1.0'
    ]
  },
  {
    command: 'compare',
    description: 'Compare two semantic versions',
    usage: 'semver compare <version1> <version2>',
    examples: [
      'semver compare 1.0.0 2.0.0',
      'semver compare 1.0.0-alpha 1.0.0-beta'
    ]
  },
  {
    command: 'increment',
    description: 'Increment a version number',
    usage: 'semver increment <version> (major|minor|patch) [--pre=alpha] [--build=001]',
    examples: [
      'semver increment 1.0.0 major',
      'semver increment 1.0.0 minor --pre=beta',
      'semver increment 1.0.0 patch --build=20240301'
    ]
  }
];

export function getCommandHelp(command?: string): string {
  if (command) {
    const cmd = commands.find(c => c.command === command);
    if (!cmd) return `Unknown command: ${command}\n\nRun 'semver --help' to see available commands.`;
    
    return [
      `Command: ${cmd.command}`,
      `Description: ${cmd.description}`,
      `\nUsage: ${cmd.usage}`,
      '\nExamples:',
      ...cmd.examples.map(ex => `  ${ex}`)
    ].join('\n');
  }

  // General help
  const help = [
    'VTubersTV Semantic Version CLI',
    'Usage: semver <command> [options]',
    '',
    'Commands:'
  ];

  commands.forEach(cmd => {
    help.push(`  ${cmd.command.padEnd(10)} ${cmd.description}`);
  });

  help.push(
    '',
    'Options:',
    '  -h, --help     Show help for a command',
    '',
    'Run \'semver <command> --help\' for more information about a command.'
  );

  return help.join('\n');
} 