const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../app')

lab.experiment('User', { timeout: 10000 }, () => {
  let Server
  /**
   * Initialize App before tests
   */
  lab.before((done) => {
    App.init().then((server) => {
      Server = server
      done()
    })
  })

  /**
   *  User Create
   */
  lab.test('User Create', (done) => {
    // Test with no payload
    let noPayLoad = Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create'
      })

    // Test with bad email
    let badEmail = Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: 'badEmail'
        }
      })

    // Test with no password
    let noPassword = Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: 'email@email.com'
        }
      })

    // Test with valid user
    let goodUser = Server
      .select('web-app')
      .inject({
        method: 'POST',
        url: '/user/create',
        payload: {
          email: new Date().getTime() + '@email.com',
          password: 'password'
        }
      })

    return noPayLoad
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
        return badEmail
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
        return noPassword
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(400)
        Code.expect(response.result).to.be.a.object()
        return goodUser
      })
      .then((response) => {
        Code.expect(response.statusCode).to.equal(200)
        Code.expect(response.result).to.be.a.string()
      })
  })
})
