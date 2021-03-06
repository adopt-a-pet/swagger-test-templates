'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var supertest = require('supertest');
var api = supertest(app); // supertest init;
var expect = chai.expect;

require('dotenv').load();

before(function(done) {
  function afterListening() {
    done();
  }

  if (app.server.listening) return afterListening();

  app.on('listening', afterListening);
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

        expect(res.body).to.equal(null); // non-json response or no schema
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
