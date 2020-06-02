const fs = require('fs')
const path = require('path')
const os = require('os')

const homeDir = process.env.HOME || os.homedir()
const dbPath = path.join(homeDir, 'zy-todo.db')

module.exports = {
  read: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let taskList
        try {
          taskList = JSON.parse(data.toString())
        } catch (e) {
          taskList = []
        }
        resolve(taskList)
      })
    })
  },
  write: (taskList) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(taskList) + '\n'
      fs.writeFile(dbPath, data, (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}