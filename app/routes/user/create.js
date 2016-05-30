// User - create

'use strict'

const Boom = require('boom')
const Studio = require('studio')
const UserService = Studio.module('User')

module.exports = (request, reply) => {
  UserService('create')(request.payload).then((jwtToken) => {
    reply(jwtToken)
  }).catch((err) => {
    reply(Boom.badRequest(err.toString()))
  })
}
