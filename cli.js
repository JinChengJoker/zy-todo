const { Command } = require('commander')
const api = require('./api.js')

const program = new Command()

program
  .command('add <taskName>')
  .description('add a task')
  .action((...cmdArgs) => {
    const taskName = cmdArgs[1].args.join(' ')
    return api.add(taskName)
  });

program.parse(process.argv);