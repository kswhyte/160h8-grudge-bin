process.env.NODE_ENV = 'test'

var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../app')
const app = require('../server')
const request = require('supertest')

chai.use(chaiHttp)

describe('GET /', function() {
  it('should return all grudges', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
    res.should.have.status(200)
    res.should.be.json
    res.body.should.be.a('object')
    res.body.should.have.property('grudge')
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
  it('/polls -- responds with success', (done) => {
    request(app)
    .get('/polls')
    .expect(200, done)
  })
  it('/vote/* -- responds with success', (done) => {
    request(app)
    .get('/vote/*')
    .expect(200, done)
  })
  it('/api/v1/polls/ -- responds with success', (done) => {
    request(app)
    .get('/api/v1/polls/')
    .expect(200, done)
  })
  it('/api/v1/polls/:id -- responds with success', (done) => {
    request(app)
      .get('/api/v1/polls/:id')
      .expect(200, done)
  })
  it('/api/v1/vote_results -- responds with success', (done) => {
    request(app)
      .get('/api/v1/vote_results')
      .expect(200, done)
  })
})

describe('POST Route(s)', () => {
  it('responds with success', (done) => {
    request(app)
      .post('/polls')
      .send({id: '34343422'})
      .expect(200, done)
  })
})
