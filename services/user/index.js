// User Services

'use strict'

const Studio = require('studio')
const Mongoose = require('mongoose')
const UserModel = Mongoose.model('User')
const AuthService = Studio.module('Auth')

class User {
  /**
   * Create a new user
   */
  * create (userData) {
    let newUser = yield new UserModel(userData).save(Studio.defer())
    return AuthService('sign')(newUser._id)
  }
  /**
   * Get a user by _id
   */
  * get (userId) {
    let user = yield UserModel.findById(userId, Studio.defer())
    if (!user) {
      throw (new Error('No user found by that _id.'))
    } else {
      return user
    }
  }
}

Studio.serviceClass(User)
