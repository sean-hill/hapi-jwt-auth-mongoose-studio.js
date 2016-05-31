// User - get

'use strict'

const Boom = require('boom')
const Studio = require('studio')
const Services = Studio.services()

module.exports = (request, reply) => {
  Services.User.get(request.auth.credentials._id).then((user) => {
    reply(user)
  }).catch((err) => {
    reply(Boom.badRequest(err.message))
  })
}
