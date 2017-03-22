'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var request = require('request');

chai.should();

require('dotenv').load();

before(function(done) {
  if (app.server.listening) return done();

  app.on('listening', function() {
    done();
  });
});

describe('/hello', function() {
  describe('get', function() {
    it('should respond with 200 Will send `Authenticated...', function(done) {
      request({
        url: 'http://basic.herokuapp.com/hello',
        qs: {
          Key: process.env.KEY
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + process.env.BASIC_AUTH
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

});
