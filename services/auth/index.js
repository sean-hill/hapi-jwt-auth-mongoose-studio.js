// Auth - Sign Service

'use strict'

const Jwt = require('jsonwebtoken')
const Config = require('../../config/config')
const Studio = require('studio')

class Auth {
  /**
   * Sign a JWT token based off the user's ID
   */
  sign (userId) {
    let secret = Config.get('/jwtAuth/secret')
    let jwtToken = Jwt.sign({ _id: userId }, secret, { expiresIn: '14 days' })
    return jwtToken
  }
}

Studio.serviceClass(Auth)
