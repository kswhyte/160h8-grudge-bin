process.env.NODE_ENV = 'test'

const chai = require('chai')
const { assert } = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server.js')
const request = require('supertest')

chai.use(chaiHttp)

describe('GET /api/v1/grudges', function() {
  it('should return all grudges', function(done) {
    chai.request(app)
    .get('/api/v1/grudges')
    .end(function(err, res) {
    res.should.have.status(200)
    res.should.be.json
    res.body.should.be.a('array')
    done()
    })
  })
})

describe('GET Route(s)', () => {
  it('undefined routes -- respond with a 404', (done) => {
    request(app)
    .get('/not-real')
    .expect(404, done)
  })
  it('/ -- responds with success upon redirect', (done) => {
    request(app)
      .get('/')
      .expect(302, done)
  })
  it('/grudges -- responds with success', (done) => {
    request(app)
    .get('/grudges')
    .expect(200, done)
  })
  it('/grudges/* -- responds with success', (done) => {
    request(app)
    .get('/jackal/*')
    .expect(200, done)
  })
  it('/api/v1/grudges/ -- responds with success', (done) => {
    request(app)
    .get('/api/v1/grudges/')
    .expect(200, done)
  })
  it('/api/v1/grudges/:id -- responds with success', (done) => {
    request(app)
      .get('/api/v1/grudges/:id')
      .expect(200, done)
  })
})

describe('POST Route(s)', () => {
  it('responds with success', (done) => {
    request(app)
      .post('/grudges')
      .send({id: '34343422'})
      .expect(200, done)
  })
})

describe('PATCH Route(s)', () => {
  it('responds with success', (done) => {
    request(app)
      .post('/grudges')
      .send({id: '34343422'})
      .expect(200, done)
  })
})
