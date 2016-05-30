// User Services

'use strict'

const Studio = require('studio')
const Mongoose = require('mongoose')
const UserModel = Mongoose.model('User')
const AuthService = Studio.module('Auth')

class User {
  /**
   * Create a new uesr
   */
  * create (userData) {
    var newUser = yield new UserModel(userData).save(Studio.defer())
    return AuthService('sign')(newUser._id)
  }
}

Studio.serviceClass(User)
