// User Routes

'use strict'

const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route({
    path: '/create',
    method: 'POST',
    config: {
      description: 'Create user',
      notes: 'Create a new user.',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        }
      }
    },
    handler: require('./create')
  })

  server.route({
    path: '/get',
    method: 'GET',
    config: {
      description: 'Get user',
      notes: 'Get a user from JWT payload.',
      tags: ['api'],
      auth: 'jwt'
    },
    handler: require('./get')
  })

  next()
}

exports.register.attributes = {
  name: 'user-routes'
}
