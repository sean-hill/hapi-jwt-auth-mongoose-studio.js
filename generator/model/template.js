// Route Template

const S = require('string')

module.exports = function (name) {
  const capitalized = S(name).capitalize().s

  return `// ${capitalized} Model

'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

var ${capitalized}Schema = new Schema({

})

Mongoose.model('${capitalized}', ${capitalized}Schema)
`
}
