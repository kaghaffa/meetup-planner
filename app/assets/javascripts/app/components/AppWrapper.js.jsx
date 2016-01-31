  define([
  'react',
  'react-router',
  'app/components/shared/Header',
  'app/components/auth/AuthWrapper',
  'app/actions/userActions',
  'app/stores/userStore'
], function(React, ReactRouter, Header, AuthWrapper, UserActions, UserStore) {
  'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

  return React.createClass({

    getInitialState() {
      return {
        user: UserStore.get()
      };
    },

    componentDidMount: function() {
      UserStore.addChangeListener(this._onUserChange);
      UserActions.get();
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._onUserChange);
    },

    _onUserChange: function() {
      this.setState({
        user: UserStore.get()
      });
    },

    render: function() {
      var content;

      if (UserStore.isSignedIn()) {
        content = (
          <RouteHandler
            signedIn={ UserStore.isSignedIn() }
            user={ this.state.user }
            { ...this.props }
          />
        );
      } else {
        content = <AuthWrapper />;
      }

      return (
        <div className="main">
          <Header isSignedIn={ UserStore.isSignedIn() } user={ this.state.user } />
          <div id="main-wrapper">
            <div className="container">
              { content }
            </div>
          </div>
        </div>
      );
    }

  });
});