'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mqttCtrlStub = {
  index: 'mqttCtrl.index',
  show: 'mqttCtrl.show',
  create: 'mqttCtrl.create',
  update: 'mqttCtrl.update',
  destroy: 'mqttCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mqttIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mqtt.controller': mqttCtrlStub
});

describe('Mqtt API Router:', function() {

  it('should return an express router instance', function() {
    mqttIndex.should.equal(routerStub);
  });

  describe('GET /api/mqtts', function() {

    it('should route to mqtt.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mqttCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mqtts/:id', function() {

    it('should route to mqtt.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mqttCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mqtts', function() {

    it('should route to mqtt.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mqttCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mqtts/:id', function() {

    it('should route to mqtt.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mqttCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mqtts/:id', function() {

    it('should route to mqtt.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mqttCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mqtts/:id', function() {

    it('should route to mqtt.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mqttCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
