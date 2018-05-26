#!/usr/bin/env node
const program = require('commander')
const handlers = require('./componentHandlers')

program
  .command('add <componentName>')
  .option('-f, --functional', 'Is a functional component?')
  .option('-o, --override', 'Override the existent component?')
  .option('-p, --parentComponent [value]', 'Parent component name?')
  .action(handlers.add)

program
  .command('remove <componentName>')
  .action(handlers.remove)

program
  .command('export')
  .action(handlers.export)

program.parse(process.argv)
