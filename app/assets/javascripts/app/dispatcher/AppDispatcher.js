define([
  'flux',
  'object-assign'
], function(Flux, ObjectAssign) {

  return ObjectAssign(new Flux.Dispatcher(), {

    // A bridge function between the views and the dispatcher, marking the
    // action as a view action.
    handleViewAction: function(action) {
      // console.log("VIEW ACTION", action)
      this.dispatch({
        source: 'VIEW_ACTION',
        action: action
      });

    },

    // Serves the same purpose, but marks the action as a server action.
    handleServerAction: function(action) {
      // console.log("SERVER ACTION", action)
      this.dispatch({
        source: 'SERVER_ACTION',
        action: action
      });
    }
  });
});
