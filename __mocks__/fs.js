const fs = jest.genMockFromModule('fs');

let readMock
let writeMock

fs.setReadMock = (err, data) => {
  readMock = [err, data]
}
fs.setWriteMock = (fn) => {
  writeMock = fn
}

fs.readFile = (path, options, callback) => {
  if(callback === undefined) callback = options
  callback(...readMock)
}
fs.writeFile = (path, data, options, callback) => {
  if(callback === undefined) callback = options
  writeMock(data, callback)
}

module.exports = fs