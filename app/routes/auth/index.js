// Auth Routes

'use strict'

const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route({
    path: '/login',
    method: 'POST',
    config: {
      description: 'User login',
      notes: 'Login with email and password.',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        }
      }
    },
    handler: require('./login')
  })

  next()
}

exports.register.attributes = {
  name: 'auth-routes'
}
