// Glance Generators

const Route = require('./route')
const Model = require('./model')
const Service = require('./service')

const projects = ['api', 'app']
const types = ['route', 'model', 'service']

let project = ''
let type = ''
let name = ''

if (process.argv.length === 5) {
  project = process.argv[2]
  type = process.argv[3]
  name = process.argv[4]
} else {
  type = process.argv[2]
  name = process.argv[3]
}

if (project && projects.indexOf(project) === -1) throw new Error(`Sorry, I don\'t support the project "${project}".`)
if (!type) throw new Error('I don\'t know what you want to generate!')
if (!name) throw new Error('Please provide a valid name.')
if (types.indexOf(type) === -1) throw new Error(`Sorry, I don\'t support the type "${type}".`)

switch (type) {
  case 'route':
    Route.create(project, name)
    break

  case 'model':
    Model.create(name)
    break

  case 'service':
    Service.create(name)
    break
}
