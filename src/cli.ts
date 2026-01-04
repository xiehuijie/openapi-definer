#!/usr/bin/env node

/**
 * OpenAPI Definer CLI
 *
 * Command-line interface for generating server and client SDKs from API definitions.
 */

import { Command } from 'commander';
import { version } from './index.js';

const program = new Command();

program
  .name('openapi-definer')
  .description(
    'A factory definition program that allows you to define things related to the API using intuitive code'
  )
  .version(version, '-v, --version', 'Display version information');

program
  .command('init')
  .description('Initialize a new API definition project')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .action((options) => {
    console.log('Initializing new API definition project...');
    console.log('Directory:', options.dir);
    // Implementation to be added
  });

program
  .command('generate')
  .description('Generate SDK from API definition')
  .option('-i, --input <file>', 'Input API definition file')
  .option('-o, --output <directory>', 'Output directory for generated SDK')
  .option('-t, --type <type>', 'SDK type (client, server, both)', 'both')
  .action((options) => {
    console.log('Generating SDK from API definition...');
    console.log('Options:', options);
    // Implementation to be added
  });

program
  .command('validate')
  .description('Validate an API definition')
  .argument('<file>', 'API definition file to validate')
  .action((file) => {
    console.log('Validating API definition...');
    console.log('File:', file);
    // Implementation to be added
  });

program.parse();
