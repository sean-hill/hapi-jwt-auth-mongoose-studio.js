// App

'use strict'

const Server = require('./server')

exports.init = () => {
  var init = Server.init
  require('./services')
  return init
}
