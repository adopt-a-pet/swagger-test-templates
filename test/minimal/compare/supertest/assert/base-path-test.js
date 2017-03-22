'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var supertest = require('supertest');
var api = supertest(app); // supertest init;
var assert = chai.assert;

require('dotenv').load();

before(function(done) {
  if (app.server.listening) return done();

  app.on('listening', function() {
    done();
  });
});

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        assert.isNull(res.body); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      api.head('/')
      .set('Content-Type', 'application/json')
      .set('accessToken', process.env.KEY_2)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

});
