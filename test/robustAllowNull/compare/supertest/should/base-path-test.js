'use strict';

var app = require(process.cwd() + '/app.js');

var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    if (val === null) return true;

    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    if (val === null) return true;

    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    if (val === null) return true;

    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    if (val === null) return true;

    // should parse
    return Number.isInteger(val);
  });

  zSchema.registerFormat('date', function(val) {
    if (val === null) return true;

    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    if (val === null) return true;

    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    if (val === null) return true;

    // should parse as a string
    return typeof val === 'string';
  });
};


var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest(app); // supertest init;

chai.should();

require('dotenv').load();

before(function(done) {
  function afterListening() {
    // Load customFormats now, to overwrite after sway pollutes them
    customFormats(ZSchema);
    done();
  }

  if (app.server.listening) return afterListening();

  app.on('listening', afterListening);
});

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "id": {
            "type": [
              "integer",
              "null"
            ]
          },
          "username": {
            "type": [
              "string",
              "null"
            ]
          }
        }
      };

      /*eslint-enable*/
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "meta": "string",
          "data": "number"
        }
      };

      /*eslint-enable*/
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "meta": "string",
          "data": "number",
          "UserObj": {
            "schema": {
              "type": [
                "object",
                "null"
              ],
              "properties": {
                "id": {
                  "type": [
                    "integer",
                    "null"
                  ]
                },
                "username": {
                  "type": [
                    "string",
                    "null"
                  ]
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/')
      .query({
        accessToken: process.env.KEY
      })
      .set('Content-Type', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": [
          "array",
          "null"
        ],
        "items": {
          "type": [
            "object",
            "null"
          ],
          "properties": {
            "id": {
              "type": [
                "integer",
                "null"
              ]
            },
            "username": {
              "type": [
                "string",
                "null"
              ]
            }
          }
        }
      };

      /*eslint-enable*/
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": [
          "number",
          "null"
        ]
      };

      /*eslint-enable*/
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": [
          "string",
          "null"
        ]
      };

      /*eslint-enable*/
      api.post('/')
      .query({
        longitude: 'DATA GOES HERE'
      })
      .set('Authorization', 'Bearer ' + process.env.OAUTH)
      .set('Content-Type', 'application/json')
      .send({
        latitude: 'DATA GOES HERE'
      })
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

});
