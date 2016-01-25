define([
  'react',
  'react-router',
  'bootstrap'
], function(React, ReactRouter) {
  'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

  return React.createClass({

    render: function() {
      return (
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Meetup Planner</a>
            </div>
            <div className="collapse navbar-collapse header-actions">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <button className="btn btn-lg btn-default">
                    <i className="fa fa-lg fa-plus"></i>CREATE EVENT
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }

  });
});