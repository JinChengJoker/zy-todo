const db = require('./db.js')

module.exports = {
  add: async (taskname) => {
    const taskList = await db.read()
    taskList.push({
      taskname,
      done: false
    })
    await db.write(taskList)
  }
}