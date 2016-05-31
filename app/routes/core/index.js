// User Routes

'use strict'

exports.register = (server, options, next) => {
  server.route({
    path: '/status',
    method: 'GET',
    config: {
      description: 'API Status Checker',
      notes: 'Checks to see if the App API is available.',
      tags: ['api']
    },
    handler: require('./status')
  })

  next()
}

exports.register.attributes = {
  name: 'core-routes'
}
