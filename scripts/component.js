#!/usr/bin/env node
const program = require('commander')
const handlers = require('./component-handlers')

program
  .command('add <componentName>')
  .option('-m, --model', 'Import vue-better-sync?')
  .option('-n, --nodes', 'Import extract-nodes?')
  .option('-d, --data', 'Import vue-merge-data?')
  .option('-f, --functional', 'Is a functional component?')
  .option('-o, --override', 'Override the existent component?')
  .option('-x, --no_inherit', 'Set inheritAttrs = false?')
  .option('-e, --ENUM', 'Has ENUM props?')
  .action(handlers.add)

program
  .command('remove <componentName>')
  .action(handlers.remove)

program
  .command('export')
  .action(handlers.export)

program.parse(process.argv)
