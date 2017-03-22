'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var supertest = require('supertest');
var api = supertest(app); // supertest init;

chai.should();

require('dotenv').load();

before(function(done) {
  if (app.server.listening) return done();

  app.on('listening', function() {
    done();
  });
});

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 Will send `Authenticated...', function(done) {
      api.get('/')
      .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
