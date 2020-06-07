const db = require('./db.js')
const inquirer = require('inquirer')

module.exports = {
  add: async (taskName) => {
    const taskList = await db.read()
    taskList.push({
      taskName,
      done: false
    })
    await db.write(taskList)
  },

  clear: async () => {
    await db.write([])
  },

  list: async () => {
    const taskList = await db.read()
    inquirer
      .prompt({
        type: 'list',
        name: 'taskIndex',
        message: '请选择操作/任务',
        choices: [
          {name: '退出', value: -1},
          ...taskList.map((task, index) => {
            return {
              name: `${task.done ? '[√]' : '[_]'} ${index + 1}. ${task.taskName}`,
              value: index
            }
          }),
          {name: '+ 创建新任务', value: -2}
        ]
      })
      .then(answer => {
        const {taskIndex} = answer
        if (taskIndex >= 0) {
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'action',
                message: '请选择操作',
                choices: [
                  {name: '退出', value: 'quit'},
                  {name: '已完成', value: 'done'},
                  {name: '未完成', value: 'undone'},
                  {name: '编辑', value: 'edit'},
                  {name: '删除', value: 'remove'},
                ]
              }
            ])
            .then(answer2 => {
              switch (answer2.action) {
                case 'done':
                  taskList[taskIndex].done = true
                  db.write(taskList)
                  break
                case 'undone':
                  taskList[taskIndex].done = false
                  db.write(taskList)
                  break
                case 'edit':
                  inquirer.prompt({
                    type: 'input',
                    name: 'taskName',
                    message: "请输入新的任务名"
                  }).then(answer3 => {
                    taskList[taskIndex].taskName = answer3.taskName
                    db.write(taskList)
                  })
                  break
                case 'remove':
                  taskIndex.splice(taskIndex, 1)
                  db.write(taskList)
                  break
              }
            })
        } else if (taskIndex === -2) {
          inquirer.prompt({
            type: 'input',
            name: 'taskName',
            message: "请输入任务名"
          }).then(answer4 => {
            taskList.push({
              taskName: answer4.taskName,
              done: false
            })
            db.write(taskList)
          })
        }
      });
  },
}