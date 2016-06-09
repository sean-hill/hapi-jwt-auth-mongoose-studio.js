// App Registrations

const Config = require('./config')

let internals = {
  registrations: [
    // Vision Plugin
    {
      plugin: 'vision'
    },
    // Inert Plugin
    {
      plugin: 'inert'
    },
    // Swagger Plugin
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'App API Documentation',
            version: '1.0.0'
          },
          documentationPath: '/webapp-docs'
        }
      }
    },
    // Logging Plugin
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            }, {
              module: 'good-console'
            }, 'stdout']
          }
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
    // Auth Routes
    {
      plugin: './app/routes/auth',
      options: {
        select: ['web-app'],
        routes: {
          prefix: '/auth'
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

module.exports = internals.registrations
