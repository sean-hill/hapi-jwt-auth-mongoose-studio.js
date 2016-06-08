// Glance Generators

const Route = require('./route')
const Model = require('./model')
const Service = require('./service')

const type = process.argv[2]
const name = process.argv[3]
const supported = ['route', 'model', 'service']

if (!type) throw new Error('I don\'t know what you want to generate!')
if (!name) throw new Error('Please provide a valid name.')
if (supported.indexOf(type) === -1) throw new Error(`Sorry, I don\'t support the type "${type}".`)

switch (type) {
  case 'route':
    Route.create(name)
    break

  case 'model':
    Model.create(name)
    break

  case 'service':
    Service.create(name)
    break
}
