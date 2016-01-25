require([
	'react',
	'react-router-shim',
	'react-router',
  'app/components/AppWrapper'
], function(React, ReactRouterShim, ReactRouter, AppWrapper) {
	'use strict';

  var Route           = ReactRouter.Route;
  var HistoryLocation = ReactRouter.HistoryLocation;

  var routes = (
  	<Route name="app" path="/" handler={ AppWrapper }>
    </Route>
  );

  ReactRouter.run(routes, HistoryLocation, function(Handler, state) {
    var params = state.params;
  	React.render(<Handler params={ params } />, document.body);
  });
});