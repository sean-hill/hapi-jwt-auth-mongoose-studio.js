// Hapi Server - Uses Labbable to export server for tests

'use strict'

const Glue = require('glue')
const Manifest = require('./config/manifest')

module.exports = {
  /**
   *  Initializes the server
   */
  init: (ready) => {
    ready = ready || function () {}
    Glue.compose(Manifest.get('/'), {
      relativeTo: __dirname
    }, (err, server) => {
      if (err) {
        throw err
      }
      server.start((err) => {
        if (err) {
          throw err
        }
        console.log('Web App running on port 3000')
        ready(server)
      })
    })
  }
}
