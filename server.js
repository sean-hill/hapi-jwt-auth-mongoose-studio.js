// Hapi Server - Uses Labbable to export server for tests

'use strict'

const Glue = require('glue')
const Manifest = require('./config/manifest')
const Studio = require('studio')

exports.init = new Studio.promise((resolve, reject) => {
  // Compose Server with Glue
  Glue.compose(Manifest.get('/'), {
    relativeTo: __dirname
  }, (err, server) => {
    if (err) throw err

    // Then start it, and resolve with promise
    server.start((err) => {
      if (err) throw err
      console.log('Web App running on port 3000')
      resolve(server)
    })
  })
})
