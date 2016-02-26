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

    mixins: [ReactRouter.Navigation],

    propTypes: {
      isSignedIn: React.PropTypes.bool.isRequired,
      user: React.PropTypes.object
    },

    _onCreateBtnClick: function() {
      this.transitionTo('/create')
    },

    render: function() {
      var content;
      if (this.props.isSignedIn) {
        content = (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <button
                className="btn btn-lg btn-default"
                onClick={ this._onCreateBtnClick }>
                <i className="fa fa-lg fa-plus"></i>CREATE EVENT
              </button>
            </li>
            <li><SignOutButton /></li>
          </ul>
        );
      } else {
        content = (
          <ul className="nav navbar-nav navbar-right">
            <li><SignInButton /></li>
          </ul>
        );
      }

      return (
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Meetup Planner</a>
            </div>
            <div className="collapse navbar-collapse header-actions">
              { content }
            </div>
          </div>
        </nav>
      );
    }

  });
});