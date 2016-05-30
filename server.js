// Hapi Server

'use strict'

const Glue = require('glue')
const Manifest = require('./config/manifest')
const options = {
  relativeTo: __dirname
}

Glue.compose(Manifest.get('/'), options, (err, server) => {
  if (err) {
    throw err
  }

  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Web App running on port 3000')
  })
})
