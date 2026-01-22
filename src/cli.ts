#!/usr/bin/env node

import { Command } from 'commander';
import { version } from './index.ts';
import initAction from './cli/init.ts';
import validateAction from './cli/validate.ts';
import generateAction from './cli/generate.ts';

const program = new Command();

program
  .name('openapi-definer')
  .description('A factory definition program that allows you to define things related to the API using intuitive code')
  .version(version, '-v, --version', 'Display version information');

// init 命令
program
  .command('init')
  .description('Initialize a new API definition project')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .action((options) => initAction(options));

// validate 命令
program
  .command('validate')
  .description('Validate an API definition')
  .argument('<file>', 'API definition file to validate')
  .action((file) => validateAction(file));

// generate 命令
program
  .command('generate <file>')
  .description('Generate OpenAPI specification from API definition file')
  .option('-o, --output <path>', 'Output file path', './openapi.json')
  .option('-f, --format <format>', 'Output format: json or yaml', 'json')
  .option('-l, --locale <locale>', 'Locale for generated documentation', 'en')
  .action((file, options) => generateAction(file, options));

program.parse();
