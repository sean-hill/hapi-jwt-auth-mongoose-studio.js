// Create Route Generator

const Path = require('path')
const WriteFile = require('writefile')

exports.create = function (project, name) {
  const path = Path.resolve(__dirname, `../../${project}/routes/${name}/index.js`)
  const template = require('./template')(name)

  WriteFile(path, template)
}
