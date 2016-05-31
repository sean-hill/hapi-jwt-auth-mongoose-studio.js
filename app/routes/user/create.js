// User - create

'use strict'

const Boom = require('boom')
const Studio = require('studio')
const Services = Studio.services()

module.exports = (request, reply) => {
  Services.User.create(request.payload).then((jwtToken) => {
    reply(jwtToken)
  }).catch((err) => {
    reply(Boom.badRequest(err.toString()))
  })
}
