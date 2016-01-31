define([
  'react',
  'react-router',
  'app/components/auth/SignInButton',
  'app/components/auth/SignOutButton',
  'bootstrap'
], function(React, ReactRouter, SignInButton, SignOutButton) {
  'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

  return React.createClass({

    propTypes: {
      isSignedIn: React.PropTypes.bool.isRequired,
      user: React.PropTypes.object
    },

    render: function() {
      var authButton = this.props.isSignedIn ? <SignOutButton /> : <SignInButton />

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
                <li>{ authButton }</li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }

  });
});