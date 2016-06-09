// App Manifest

'use strict'

const Confidence = require('confidence')
const Registrations = require('./registrations')
const Connections = require('./connections')

let internals = {
  criteria: {
    env: process.env.NODE_ENV
  }
}

internals.manifest = {

  $meta: 'App manifest document',
  server: {
    app: {
      slogan: 'We push the web forward'
    }
  },
  connections: Connections,
  registrations: Registrations
}

internals.store = new Confidence.Store(internals.manifest)

exports.get = function (key) {
  return internals.store.get(key, internals.criteria)
}

exports.meta = function (key) {
  return internals.store.meta(key, internals.criteria)
}
