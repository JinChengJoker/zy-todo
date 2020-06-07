const { Command } = require('commander')
const api = require('./api.js')

const program = new Command()

program
  .command('add <taskName>')
  .description('Add a task')
  .action((...cmdArgs) => {
    const taskName = cmdArgs[1].args.join(' ')
    api.add(taskName).then(() => console.log('添加成功'))
  });

program
  .command('clear')
  .description('Clear all task')
  .action(() => {
    api.clear().then(() => console.log('清除成功'))
  });

program.parse(process.argv);