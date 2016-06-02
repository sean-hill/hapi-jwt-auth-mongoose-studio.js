const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../')

lab.experiment('User', () => {
  let Server
  /**
   * Initialize App before tests
   */
  lab.before((done) => {
    App.init(function (server) {
      Server = server
      done()
    })
  })

  /**
   * Kill App after tests
   */
  lab.after((done) => {
    Server.stop(done)
  })

  /**
   *  Test Server Status
   */
  lab.test('GET /core/status', (done) => {
    let options = {
      method: 'GET',
      url: '/core/status'
    }

    Server.select('web-app').inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.result).to.be.a.string()
      done()
    })
  })
})
