const fs = require('fs')
const db = require('../db.js')

jest.mock('fs');

describe('db', () => {

  it('read', async () => {
    const temp = [{taskName: 'buy xxx', done: true}]
    fs.setMock(null, JSON.stringify(temp))
    const data = await db.read()
    expect(data).toStrictEqual(temp)
  })

})