// User - get

'use strict'

const Boom = require('boom')
const Mongoose = require('mongoose')
const UserModel = Mongoose.model('User')

module.exports = (request, reply) => {
  var userId = request.auth.credentials._id

  UserModel.findById(userId, (err, user) => {
    if (err) {
      reply(Boom.badRequest('Issue getting user'))
    } else {
      reply(user)
    }
  })
}
