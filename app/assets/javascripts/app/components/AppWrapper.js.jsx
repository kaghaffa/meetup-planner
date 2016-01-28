define([
  'react',
  'react-router',
  'app/components/shared/Header',
  'app/components/auth/SignInForm',
  'app/components/auth/SignOutButton',
  'app/components/auth/SignUpForm',
  'app/actions/userActions',
  'app/stores/userStore',
], function(React, ReactRouter, Header, SignInForm, SignOutButton, SignUpForm,
    UserActions, UserStore) {
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
      var str = UserStore.isSignedIn() ? "SIGNED IN" : "SIGNED OUT"
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
        content = "SIGN IN RIGHT NOW";
      }

      return (
        <div className="main">
          <Header />
          {str}
          {this.state.user}
          <SignInForm />
          <SignOutButton />
          <SignUpForm />
          <div id="main-wrapper">
            <div className="container">{ content }</div>
          </div>
        </div>
      );
    }

  });
});