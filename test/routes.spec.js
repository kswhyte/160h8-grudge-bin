process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('API Routes', function() {

});

describe('GET /', function() {
  it('should return all grudges', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('grudge');
    done();
    });
  });
});
