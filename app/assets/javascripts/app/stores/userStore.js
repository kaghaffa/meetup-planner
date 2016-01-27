define([
  'event-emitter',
  'lodash',
  'app/dispatcher/AppDispatcher',
  'app/constants/userConstants'
], function(EventEmitter, _, Dispatcher, UserConstants) {

  'use strict';

  var _user = {};

  function _setUser(user) {
    _user = user;
  }

  // User Store
  var UserStore = _.extend({}, EventEmitter.prototype, {

    emitChange: function() {
      this.emit('change');
    },

    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    },

    get: function() {
      return _user;
    },

    isSignedIn: function() {
      return !_.isEmpty(_user) && _user.signed_in;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
      var action = payload.action;

      switch (action.type) {
        case UserConstants.GET_CURRENT_USER_SUCCESS:
          _setUser(action.response);
          UserStore.emitChange();
          break;
      }

      return true;
    })
  });

  return UserStore;
});
