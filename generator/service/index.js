// Create Route Generator

const Path = require('path')
const WriteFile = require('writefile')

exports.create = function (name) {
  const path = Path.resolve(__dirname, `../../services/${name}/index.js`)
  const template = require('./template')(name)

  WriteFile(path, template)
}
