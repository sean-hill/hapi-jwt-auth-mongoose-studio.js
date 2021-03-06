// App Configuration

'use strict'

const Confidence = require('confidence')

// Confidence criteria
let internals = {
  criteria: {
    env: process.env.NODE_ENV
  }
}

internals.config = {
  //
  $meta: 'App configuration file',
  //
  // Mongoose Connector
  //
  mongoose: {
    $filter: 'env',
    production: {
      uri: 'mongodb://localhost/echo',
      debug: false
    },
    test: {
      uri: 'mongodb://localhost/echo-test',
      debug: true
    },
    $default: {
      uri: 'mongodb://localhost/echo-dev',
      debug: true
    }
  },
  //
  // JWT Auth
  //
  jwtAuth: {
    secret: 'App Secret'
  }
}

// Confidence store
internals.store = new Confidence.Store(internals.config)

exports.get = function (key) {
  return internals.store.get(key, internals.criteria)
}

exports.meta = function (key) {
  return internals.store.meta(key, internals.criteria)
}
