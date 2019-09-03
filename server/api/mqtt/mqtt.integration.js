'use strict';

var app = require('../..');
var request = require('supertest');

var newMqtt;

describe('Mqtt API:', function() {

  describe('GET /api/mqtts', function() {
    var mqtts;

    beforeEach(function(done) {
      request(app)
        .get('/api/mqtts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mqtts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mqtts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mqtts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mqtts')
        .send({
          name: 'New Mqtt',
          info: 'This is the brand new mqtt!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newMqtt = res.body;
          done();
        });
    });

    it('should respond with the newly created mqtt', function() {
      newMqtt.name.should.equal('New Mqtt');
      newMqtt.info.should.equal('This is the brand new mqtt!!!');
    });

  });

  describe('GET /api/mqtts/:id', function() {
    var mqtt;

    beforeEach(function(done) {
      request(app)
        
        .get('/api/mqtts/' + newMqtt.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mqtt = res.body;
          done();
        });
    });

    afterEach(function() {
      mqtt = {};
    });

    it('should respond with the requested mqtt', function() {
      mqtt.name.should.equal('New Mqtt');
      mqtt.info.should.equal('This is the brand new mqtt!!!');
    });

  });

  describe('PUT /api/mqtts/:id', function() {
    var updatedMqtt

    beforeEach(function(done) {
      request(app)
        
        .put('/api/mqtts/' + newMqtt.id)
        .send({
          name: 'Updated Mqtt',
          info: 'This is the updated mqtt!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMqtt = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMqtt = {};
    });

    it('should respond with the updated mqtt', function() {
      updatedMqtt.name.should.equal('Updated Mqtt');
      updatedMqtt.info.should.equal('This is the updated mqtt!!!');
    });

  });

  describe('DELETE /api/mqtts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        
        .delete('/api/mqtts/' + newMqtt.id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mqtt does not exist', function(done) {
      request(app)
        
        .delete('/api/mqtts/' + newMqtt.id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
