const db = require('./db.js')

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
    taskList.forEach((task) => {
      console.log(task.taskName)
    })
  },
}