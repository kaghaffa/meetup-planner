define([
  'event-emitter',
  'lodash',
  'app/dispatcher/AppDispatcher',
  'app/constants/eventConstants',
], function(EventEmitter, _, Dispatcher, EventConstants) {

  'use strict';

  var _events = [];
  var _event  = {};

  function _setEvents(events) {
    _events = events;
  }

  function _setEvent(event) {
    _event = event;
  }

  // Event Store
  var EventStore = _.extend({}, EventEmitter.prototype, {

    emitChange: function() {
      this.emit('change');
    },

    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    },

    getEvents: function() {
      return _events;
    },

    getEvent: function() {
      return _event;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
      var action = payload.action;

      switch (action.type) {
        case EventConstants.GET_EVENTS_SUCCESS:
          _setEvents(action.response);
          EventStore.emitChange();
          break;
      }

      return true;
    })
  });

  return EventStore;
});
