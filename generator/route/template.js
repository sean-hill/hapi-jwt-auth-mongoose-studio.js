// Route Template

const S = require('string')

module.exports = function (name) {
  const capitalized = S(name).capitalize().s

  return `// ${capitalized} Routes

'use strict'

const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route({
    // ...
  })

  next()
}

exports.register.attributes = {
  name: '${name}-routes'
}
`
}
