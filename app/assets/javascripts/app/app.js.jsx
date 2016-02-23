require([
	'react',
	'react-router-shim',
	'react-router',
  'app/components/AppWrapper',
  'app/components/create-event/CreateEventWrapper',
  'app/components/events/EventsWrapper'
], function(React, ReactRouterShim, ReactRouter, AppWrapper,
  CreateEventWrapper, EventsWrapper) {
	'use strict';

  var Route           = ReactRouter.Route;
  var HistoryLocation = ReactRouter.HistoryLocation;
  var DefaultRoute    = ReactRouter.DefaultRoute;

  var routes = (
  	<Route name="app" path="/" handler={ AppWrapper }>
      <DefaultRoute name="events" handler={ EventsWrapper } />
      <Route name="create" path="create" handler={ CreateEventWrapper } />
    </Route>

  );

  ReactRouter.run(routes, HistoryLocation, function(Handler, state) {
    var params = state.params;
  	React.render(<Handler params={ params } />, document.body);
  });
});