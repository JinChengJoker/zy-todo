const fs = jest.genMockFromModule('fs');

let mocks

fs.setMock = (err, data) => {
  mocks = [err, data]
}

fs.readFile = (path, options, callback) => {
  callback(...mocks)
}

module.exports = fs