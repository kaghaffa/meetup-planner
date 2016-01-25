define([
	'react',
	'react-router',
	'app/components/shared/Header',
], function(React, ReactRouter, Header) {
	'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

	return React.createClass({

	  render: function() {
	    return (
	    	<div className="container">
	    		<Header />
					<div id="main-wrapper">
						<RouteHandler { ...this.props } />
					</div>
	    	</div>
	    );
	  }

	});
});