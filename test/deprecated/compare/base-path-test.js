'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var request = require('request');
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
  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/',
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json',
          accessToken: process.env.KEY_2
        }
      },
      function(error, res) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);
        done();
      });
    });

  });

});
