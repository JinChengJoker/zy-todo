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
    listAllTasks(taskList).then(answer => handleUserSelect(taskList, answer))
  },
}

function listAllTasks(taskList) {
  return inquirer.prompt({
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
}

function handleUserSelect(taskList, answer) {
  const {taskIndex} = answer
  if (taskIndex >= 0) {
    // 选择了某个任务
    listTaskActions().then(answer => handleTaskAction(taskList, taskIndex, answer))
  } else if (taskIndex === -2) {
    // 选择了创建新任务
    askTaskName().then(answer => {
      taskList.push({
        taskName: answer.taskName,
        done: false
      })
      db.write(taskList)
    })
  }
}

function listTaskActions() {
  return inquirer.prompt({
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
  })
}

function handleTaskAction(taskList, taskIndex, answer) {
  switch (answer.action) {
    case 'done':
      taskList[taskIndex].done = true
      db.write(taskList)
      break
    case 'undone':
      taskList[taskIndex].done = false
      db.write(taskList)
      break
    case 'edit':
      askTaskName().then(answer => {
        taskList[taskIndex].taskName = answer.taskName
        db.write(taskList)
      })
      break
    case 'remove':
      taskList.splice(taskIndex, 1)
      db.write(taskList)
      break
  }
}

function askTaskName() {
  return inquirer.prompt({
    type: 'input',
    name: 'taskName',
    message: "请输入任务名"
  })
}