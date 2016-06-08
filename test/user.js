const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../app')

const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = Code.expect

describe('User Requests', { timeout: 10000 }, () => {
  let Server

  before((done) => {
    App.init().then((server) => {
      Server = server
      done()
    })
  })

  it('rejects a request with no payload', () => {
    return Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create'
      })
      .then((response) => {
        expect(response.statusCode).to.equal(400)
        expect(response.result).to.be.a.object()
      })
  })

  it('rejects a request with no email', () => {
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
        expect(response.statusCode).to.equal(400)
        expect(response.result).to.be.a.object()
      })
  })

  it('rejects a request with an invalid email', () => {
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
        expect(response.statusCode).to.equal(400)
        expect(response.result).to.be.a.object()
      })
  })

  it('rejects a request with no password', () => {
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
        expect(response.statusCode).to.equal(400)
        expect(response.result).to.be.a.object()
      })
  })

  it('creates a new user', () => {
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
        expect(response.statusCode).to.equal(200)
        expect(response.result).to.be.a.string()
      })
  })
})
