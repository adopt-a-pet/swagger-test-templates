'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var supertest = require('supertest');
var api = supertest(app); // supertest init;

chai.should();

before(function(done) {
  if (app.server.listening) return done();

  app.on('listening', function() {
    done();
  });
});

describe('/{id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/userSuppliedID')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      api.head('/userSuppliedID')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

});
