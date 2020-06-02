const { Command } = require('commander')
const api = require('./api.js')

const program = new Command()

program
  .command('add <taskName>')
  .description('add a task')
  .action((...cmdArgs) => {
    const taskname = cmdArgs[1].args.join(' ')
    api.add(taskname)
  });

program.parse(process.argv);