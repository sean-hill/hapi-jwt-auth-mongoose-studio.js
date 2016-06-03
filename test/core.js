const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../app')

lab.experiment('User', () => {
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
   *  Test Server Status
   */
  lab.test('App Server Status', (done) => {
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
