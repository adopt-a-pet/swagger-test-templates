'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var request = require('request');

chai.should();

before(function(done) {
  function afterListening() {
    done();
  }

  if (app.server.listening) return afterListening();

  app.on('listening', afterListening);
});

describe('/{id}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/{id PARAM GOES HERE}',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/{id PARAM GOES HERE}',
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res) {
        if (error) return done(error);

        res.statusCode.should.equal(200);
        done();
      });
    });

  });

});
