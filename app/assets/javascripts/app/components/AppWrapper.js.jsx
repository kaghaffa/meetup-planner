  define([
  'react',
  'react-router',
  'app/components/shared/Header',
  'app/components/auth/AuthWrapper',
  'app/components/shared/Loading',
  'app/actions/userActions',
  'app/stores/userStore'
], function(React, ReactRouter, Header, AuthWrapper, Loading, UserActions, UserStore) {
  'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

  return React.createClass({

    getInitialState: function() {
      return {
        user: UserStore.get(),
        loading: true
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
        user: UserStore.get(),
        loading: false
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

      if (this.state.loading) {
        content = <Loading />
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