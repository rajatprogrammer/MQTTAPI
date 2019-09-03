/**
 * Mqtt model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Mqtt = require('../../sqldb').Mqtt;
var MqttEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MqttEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mqtt.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    
    MqttEvents.emit(event + ':' + doc.id, doc);
    MqttEvents.emit(event, doc);
    done(null);
  }
}

module.exports = MqttEvents;
