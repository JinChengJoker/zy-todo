const fs = require('fs')
const db = require('../db.js')

jest.mock('fs');

describe('db', () => {

  it('read', async () => {
    const temp = [{taskName: 'buy xxx', done: true}]
    fs.setReadMock(null, JSON.stringify(temp))
    const data = await db.read()
    expect(data).toStrictEqual(temp)
  })

  it('write', async () => {
    let fake
    fs.setWriteMock((data, callback) => {
      fake = data
      callback(null)
    })
    const temp = [{taskName: 'buy xxx', done: true}]
    await db.write(temp)
    expect(fake).toBe(JSON.stringify(temp) + '\n')
  })

})