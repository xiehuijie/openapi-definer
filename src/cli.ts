#!/usr/bin/env node

import { Command } from 'commander';
import { version } from './index.ts';
import { registerInit } from './cli/init.ts';
import { registerValidate } from './cli/validate.ts';

const program = new Command();

program
  .name('openapi-definer')
  .description('A factory definition program that allows you to define things related to the API using intuitive code')
  .version(version, '-v, --version', 'Display version information');

registerInit(program);
registerValidate(program);

program.parse();
