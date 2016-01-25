define([
  'react',
  'react-router'
], function(React, ReactRouter) {
  'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

  return React.createClass({

    render: function() {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Checkout Form
              </a>
            </div>
          </div>
        </nav>
      );
    }

  });
});