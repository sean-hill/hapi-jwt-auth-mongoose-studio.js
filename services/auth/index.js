// Auth - Sign Service

'use strict'

const Jwt = require('jsonwebtoken')
const Config = require('../../config/config')
const Mongoose = require('mongoose')
const Studio = require('studio')
const UserModel = Mongoose.model('User')

class Auth {
  /**
   * Sign a JWT token based off the user's ID
   */
  sign (userId) {
    let secret = Config.get('/jwtAuth/secret')
    let jwtToken = Jwt.sign({ _id: userId }, secret, { expiresIn: '14 days' })
    return jwtToken
  }
  /**
   * Login with an email and password, to get back a JWToken
   */
  * login (auth) {
    let email = auth.email
    let password = auth.password
    let user = yield UserModel.findOne({ email: email }, Studio.defer())

    if (!user) {
      throw (new Error('No user found with that email address.'))
    } else {
      let authenticated = user.authenticate(password)

      if (!authenticated) {
        throw (new Error('That password is incorrect.'))
      } else {
        return this.sign(user._id)
      }
    }
  }
}

Studio.serviceClass(Auth)
