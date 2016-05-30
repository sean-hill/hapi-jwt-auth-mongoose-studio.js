// Mongoose Module

'use strict'

const Mongoose = require('mongoose')
const Glob = require('glob')

exports.register = (plugin, options, next) => {
  Mongoose.connect(options.uri, (err) => {
    if (err) {
      console.log(err)
      throw err
    }
  })

  // Debug mongoose
  Mongoose.set('debug', options.debug)

  // When the connection is disconnected
  Mongoose.connection.on('connected', () => {
    console.log('Mongo Database connected')
  })

  // When the connection is disconnected
  Mongoose.connection.on('disconnected', () => {
    console.log(' Mongo Database disconnected')
  })

  // If the node process ends, close the mongoose connection
  process.on('SIGINT', () => {
    Mongoose.connection.close(() => {
      console.log('Mongo Database disconnected through app termination')
      process.exit(0)
    })
  })

  // Load models
  var models = Glob.sync('app/models/*.js')
  models.forEach((model) => {
    require('../' + model)
  })

  next()
}

exports.register.attributes = {
  name: 'mongoose-db'
}
