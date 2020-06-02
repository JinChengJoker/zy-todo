const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()
const { Command } = require('commander')

const program = new Command()
const homeDir = process.env.HOME || homedir
const dbPath = path.join(homeDir, 'zy-todo.db')

program
  .command('add <taskName>')
  .description('add a task')
  .action((...cmdArgs) => {
    const taskname = cmdArgs[1].args.join(' ')
    fs.readFile(dbPath, {flag: 'a+'}, (err1, data) => {
      if(err1) {
        throw err1
      } else {
        let taskList
        try {
          taskList = JSON.parse(data.toString())
        } catch (e) {
          taskList = []
        }
        taskList.push({
          taskname: taskname,
          done: false
        })
        fs.writeFile(dbPath, JSON.stringify(taskList), (err2) => {
          if(err2) throw err2
        })
      }
    })
  });

program.parse(process.argv);