const db = require('./db.js')

module.exports = {
  add: async (taskName) => {
    const taskList = await db.read()
    taskList.push({
      taskName,
      done: false
    })
    await db.write(taskList)
  }
}