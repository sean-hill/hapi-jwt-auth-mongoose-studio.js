// Auth - login

'use strict'

const Boom = require('boom')
const Studio = require('studio')
const Services = Studio.services()

module.exports = (request, reply) => {
  Services.Auth.login(request.payload).then((jwtToken) => {
    reply(jwtToken)
  }).catch((err) => {
    reply(Boom.badRequest(err.message))
  })
}
