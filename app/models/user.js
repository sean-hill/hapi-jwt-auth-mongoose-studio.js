// User Model

'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const Crypto = require('crypto')

var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  jwtToken: {
    type: String
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
})

/**
 * Hook a pre save method to hash the password and create jwt token
 */
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.salt = Crypto.randomBytes(16).toString('base64')
    this.password = this.hashPassword(this.password)
  }
  next()
})

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return Crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64')
  } else {
    return password
  }
}

/**
 * Create instance method for making salt
 */
UserSchema.methods.makeSalt = function () {
  return Crypto.randomBytes(16).toString('base64')
}

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password)
}

Mongoose.model('User', UserSchema)
