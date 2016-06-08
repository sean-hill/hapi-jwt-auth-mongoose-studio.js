// Service Template

const S = require('string')

module.exports = function (name) {
  const capitalized = S(name).capitalize().s

  return `// ${capitalized} Services

'use strict'

const Studio = require('studio')
const Mongoose = require('mongoose')
const ${capitalized}Model = Mongoose.model('${capitalized}')
const Services = Studio.services()

class ${capitalized} {

}

Studio.serviceClass(${capitalized})
`
}
