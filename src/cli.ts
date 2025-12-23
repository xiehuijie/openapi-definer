#!/usr/bin/env node

/**
 * OpenAPI Definder CLI
 *
 * Command-line interface for generating server and client SDKs from API definitions.
 */

import { version } from './index.js';

/**
 * Display help information
 */
function displayHelp(): void {
  console.log(`
OpenAPI Definder v${version}

Usage: openapi-definder [command] [options]

Commands:
  generate    Generate SDK from API definition
  init        Initialize a new API definition project
  validate    Validate an API definition
  help        Display this help message

Options:
  --version   Display version information
  --help      Display this help message

Examples:
  openapi-definder init
  openapi-definder generate --input api.ts --output ./sdk
  openapi-definder validate api.ts

For more information, visit: https://github.com/xiehuijie/openapi-definder
`);
}

/**
 * Display version information
 */
function displayVersion(): void {
  console.log(`openapi-definder v${version}`);
}

/**
 * Main CLI entry point
 */
function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    displayHelp();
    return;
  }

  const command = args[0];

  switch (command) {
    case 'help':
    case '--help':
    case '-h':
      displayHelp();
      break;

    case 'version':
    case '--version':
    case '-v':
      displayVersion();
      break;

    case 'init':
      console.log('Initializing new API definition project...');
      console.log('(Not implemented yet)');
      break;

    case 'generate':
      console.log('Generating SDK from API definition...');
      console.log('(Not implemented yet)');
      break;

    case 'validate':
      console.log('Validating API definition...');
      console.log('(Not implemented yet)');
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log('Run "openapi-definder help" for usage information.');
      process.exit(1);
  }
}

// Run CLI
main();
