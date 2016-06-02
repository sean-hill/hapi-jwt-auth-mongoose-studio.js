// Server

'use strict'

const Server = require('./server')

exports.init = (ready) => {
  Server.init(ready)
  require('./services')
}
