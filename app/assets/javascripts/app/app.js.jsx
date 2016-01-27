require([
	'react',
	'react-router-shim',
	'react-router',
  'app/components/AppWrapper',
  'app/components/create-event/CreateEventWrapper'
], function(React, ReactRouterShim, ReactRouter, AppWrapper, CreateEventWrapper) {
	'use strict';

  var Route           = ReactRouter.Route;
  var HistoryLocation = ReactRouter.HistoryLocation;

  var routes = (
  	<Route name="app" path="/" handler={ AppWrapper }>
      <Route name="create" path="create" handler={ CreateEventWrapper } />
    </Route>
  );

  ReactRouter.run(routes, HistoryLocation, function(Handler, state) {
    var params = state.params;
  	React.render(<Handler params={ params } />, document.body);
  });
});