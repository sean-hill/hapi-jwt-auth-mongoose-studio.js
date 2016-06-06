const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../app')

lab.experiment('User', { timeout: 10000 }, () => {
  let Server

  // Before tests
  lab.before((done) => {
    App.init().then((server) => {
      Server = server
      done()
    })
  })

  // Test with no payload
  lab.test('Create - No Payload', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create'
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
      })
  })

  // Test with no email
  lab.test('Create - No Email', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          password: 'password'
        }
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
      })
  })

  // Test a bad email
  lab.test('Create - Bad Email', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: 'badEmail',
          password: 'password'
        }
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
      })
  })

  // Test with no password
  lab.test('Create - No Password', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: 'email@email.com'
        }
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
      })
  })

  // Test with valid user
  lab.test('Create - Bad Email', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: `${new Date().getTime()}@email.com`,
          password: 'password'
        }
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(200)
        Code.expect(response.result).to.be.a.string()
      })
  })
})
