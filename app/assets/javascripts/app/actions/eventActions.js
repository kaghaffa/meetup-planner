define([
  'app/constants/eventConstants',
  'app/dispatcher/AppDispatcher'
], function(EventConstants, Dispatcher) {

  'use strict';

  return {
    // GET api/v1/events
    get: function() {
      $.get("/api/v1/events", function(res) {
        // Success
        Dispatcher.handleServerAction({
          type: EventConstants.GET_EVENTS_SUCCESS,
          response: res
        });

      }).fail(function(jqXHR, textStatus, errorThrown) {

        // Failure
        Dispatcher.handleServerAction({
          type: EventConstants.GET_EVENTS_FAIL,
          msg: textStatus + " " + errorThrown
        });
      });
    },

    // POST api/v1/events
    create: function(event) {
      $.post("/api/v1/events", event, function(res) {
        // Success
        Dispatcher.handleServerAction({
          type: EventConstants.CREATE_EVENT_SUCCESS,
          response: res
        });

      }).fail(function(jqXHR, textStatus, errorThrown) {

        // Failure
        Dispatcher.handleServerAction({
          type: EventConstants.CREATE_EVENT_FAIL,
          msg: textStatus + " " + errorThrown
        });
      });
    },
  }

});