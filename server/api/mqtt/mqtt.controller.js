/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mqtts              ->  index
 * POST    /api/mqtts              ->  create
 * GET     /api/mqtts/:id          ->  show
 * PUT     /api/mqtts/:id          ->  update
 * DELETE  /api/mqtts/:id          ->  destroy
 */
'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
const client = require('../../config/socket');
var Mqtt = sqldb.Mqtt;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Mqtts
exports.index = function(req, res) {
  Mqtt.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Mqtt from the DB
exports.show = function(req, res) {
  Mqtt.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Mqtt in the DB
exports.create = function(req, res) {
      console.log("api call");
      var Device_status = req.body.status;
      var Device_id = req.body.Device_id;
      client.publish('/Devices/'+Device_id+'/status',Device_status);
      res.send("server is start");
};

// Updates an existing Mqtt in the DB
exports.update = function(req, res) {
  
  if(req.body.id){
    delete req.body.id;
  }
  Mqtt.find({
    where: {
      id: req.params.id
    }
  }).then()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Mqtt from the DB
exports.destroy = function(req, res) {
  Mqtt.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
