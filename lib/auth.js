// Auth Module

'use strict'

const jwtPlugin = require('hapi-auth-jwt2')
const Mongoose = require('mongoose')

exports.register = (server, options, next) => {
  const UserModel = Mongoose.model('User')

  server.register(jwtPlugin)
  server.auth.strategy('jwt', 'jwt', {
    key: options.secret,
    validateFunc: (decoded, request, callback) => {
      console.log('DECODED:', decoded)
      if (!decoded._id) return callback(null, false)
      UserModel.findById(decoded._id, '_id', callback)
    },
    verifyOptions: { algorithms: [ 'HS256' ] }
  })

  next()
}

exports.register.attributes = {
  name: 'jwt-auth'
}
