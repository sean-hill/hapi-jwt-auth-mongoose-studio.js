// App Manifest

'use strict'

const Confidence = require('confidence')
const Config = require('./config')

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
  connections: [
    {
      port: 3000,
      labels: ['web-app']
    },
    {
      port: 9000,
      labels: ['api']
    }
  ],
  registrations: [
    // Vision Plugin
    {
      plugin: 'vision'
    },
    // Inert Plugin
    {
      plugin: 'inert'
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'App API Documentation',
            version: '1.0.0'
          },
          documentationPath: '/app-docs'
        }
      }
    },
    // Mongoose Plugin
    {
      plugin: {
        register: './lib/mongoose',
        options: Config.get('/mongoose')
      }
    },
    // JWT Auth Plugin
    {
      plugin: {
        register: './lib/auth',
        options: Config.get('/jwtAuth')
      },
      options: {
        select: ['web-app']
      }
    },
    // Core Routes
    {
      plugin: './app/routes/core',
      options: {
        select: ['web-app'],
        routes: {
          prefix: '/core'
        }
      }
    },
    // User Routes
    {
      plugin: './app/routes/user',
      options: {
        select: ['web-app'],
        routes: {
          prefix: '/user'
        }
      }
    }
  ]
}

internals.store = new Confidence.Store(internals.manifest)

exports.get = function (key) {
  return internals.store.get(key, internals.criteria)
}

exports.meta = function (key) {
  return internals.store.meta(key, internals.criteria)
}
