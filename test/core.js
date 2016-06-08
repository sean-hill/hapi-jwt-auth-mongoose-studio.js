const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const App = require('../app')

const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = Code.expect

describe('Core Requests', () => {
  let Server

  before((done) => {
    App.init().then((server) => {
      Server = server
      done()
    })
  })

  it('returns the web apps status', (done) => {
    return Server
      .select('web-app')
      .inject({
        method: 'GET',
        url: '/core/status'
      })
      .then(function (response) {
        expect(response.statusCode).to.equal(200)
        expect(response.result).to.be.a.string()
      })
  })
})
